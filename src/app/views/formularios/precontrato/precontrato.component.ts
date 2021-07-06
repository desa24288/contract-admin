import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { RutValidator } from 'ng2-rut';
// import { Configuracion } from 'src/app/config/configuracion';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ParametrosService } from 'src/app/services/parametros/parametros.service';
import { saveAs as importedSaveAs } from 'file-saver';
/*DATE PICKER */
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
/*Models */
import { Utils } from 'src/app/models/utils/utils';
import { DateMenorValidation } from 'src/app/models/validations/DateMenorValidation';
import { DateRangeValidation } from 'src/app/models/validations/DateRangeValidation';
import * as XLSX from 'xlsx';
import { Archivoxls } from 'src/app/models/xls/archivoxls';
import { exit } from 'process';
import { Parametros } from 'src/app/models/entity/parametros/parametros';
import { Empresa } from 'src/app/models/entity/parametros/empresa';
import { Curso } from 'src/app/models/entity/parametros/curso';
import { Otec } from 'src/app/models/entity/parametros/otec';

const { read, write, utils } = XLSX;
type AOA = any[][];

@Component({
  selector: 'app-precontrato',
  templateUrl: './precontrato.component.html',
  styleUrls: ['./precontrato.component.css']
})
export class PrecontratoComponent implements OnInit, AfterViewInit {
  @ViewChild(NgProgressComponent, {static: false}) progressBar: NgProgressComponent;
  @ViewChild('alertSwalConfirmar', {static: false}) alertSwalConfirmar: SwalComponent;
  @ViewChild('alertSwalAlert', {static: false}) alertSwalAlert: SwalComponent;
  @ViewChild('alertSwal', {static: false}) alertSwal: SwalComponent;

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'SheetJS.xlsx';
  public bsModalRef: BsModalRef;
  public alerts: any[] = [];
  public load = false;
  public currentPage = 1;
  public loading = false;
  /** Atributos Datepicker */
  public bsConfig: Partial<BsDatepickerConfig>;
  public locale = 'es';
  public colorTheme = 'theme-orange';

  public cabecera = 'Pre Contratos';

  public pForm: FormGroup;
  public qForm: FormGroup;
  public arrinscritos: Array<any> = [];
  // private global: Configuracion = new Configuracion();
  public isIngresado = true;
  fileToUpload: File = null;
  public filename = null;
  public preload = false;
  public archivoxls: Array<Archivoxls> = [];
  public totalreg = 0;
  public parametros: Array<Parametros> = [];
  public prefecha: Date;

  public empresa: Empresa = new Empresa();
  public curso: Curso = new Curso();
  public otecarr: Array<Otec> = [];

  private total: any;

  constructor(
    public router: Router,
    public datePipe: DatePipe,
    public localeService: BsLocaleService,
    public formBuilder: FormBuilder,
    public rutValidator: RutValidator,
    public bsModalService: BsModalService,
    public parametrosService: ParametrosService
  ) {
    this.pForm = this.formBuilder.group({
      fechacontrato: [{ value: new Date(), disabled: false }, Validators.required],
      fechatermino: [{ value: new Date(), disabled: false }, Validators.required],
      nomempresa: [{ value: null, disabled: true }, Validators.required],
      rutempresa: [null, [Validators.required, rutValidator]],
      domicilioemp: [{ value: null, disabled: true }, Validators.required],
      nomcurso: [{ value: null, disabled: true }, Validators.required],
      codsence: [{ value: null, disabled: false }, Validators.required],
      capacitador: [{ value: null, disabled: false }, Validators.required],
      rutcap: [{ value: null, disabled: true }, Validators.required],
      domiciliocap: [{ value: null, disabled: true }, Validators.required],
      modcurso: [{ value: null, disabled: true }, Validators.required],
      horariocurso: [{ value: null, disabled: true }, Validators.required],
      duracioncurso: [{ value: null, disabled: true }, Validators.required],
      dataxls: [{ value: null, disabled: true }, Validators.required]
    },
    { validators: [DateMenorValidation('fechacontrato', 'fechatermino')]
  });
    this.qForm = this.formBuilder.group({
    });
  }

  ngOnInit() {
    this.setDate();
    this.pForm.controls.rutcap.disable();
    this.getCnt();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkcntst();
      // this.setOtec();
      // this.pForm.controls.rutcap.disable();
    });
  }

  getCnt() {
    this.parametrosService.getSum().subscribe( async res => {
      this.total = res;
      console.log(this.total);
      this.checkcntst();
    }, err => { console.log(err); });
  }
  checkcntst() {
    if (this.total >= 5) {
      console.log('fail');
      this.alertSwalAlert.title = 'Memoria insuficiente';
      this.alertSwalAlert.show().then(ok => {
        if (ok.value) {
          this.router.navigate(['/home']);
        }
      });
      this.load = false;
    } else {
      console.log('ok..');
      this.setOtec();
      this.pForm.controls.rutcap.disable();
    }
  }

  setDate() {
    defineLocale(this.locale, esLocale);
    this.localeService.use(this.locale);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  setOtec() {
    this.load = true;
    this.parametrosService.getOtec().subscribe( data => {
      this.otecarr = data;
    }, err => {
      this.alertSwalAlert.title = 'Ocurrio un Error';
      this.alertSwalAlert.show();
      this.load = false;
    });
  }

  async onGenerar() {
    console.log(this.parametros);
    if (this.pForm.valid && this.qForm.valid) {
      if (this.parametros === [] || this.data === [] || this.parametros === null) {
        this.alertSwalAlert.title = 'Falta Cargar planilla';
        this.alertSwalAlert.show();
        this.loading = false;
        this.load = false;
        return;
      } else {
        await this.onPruebarest();
        // await this.onPruebarestB();
      }
    } else {  console.log('FALTAN DATOS'); }
  }

  onCargarxls() {
    if (this.pForm.valid && this.qForm.valid) {
      console.log('CARGA XLS');
    } else {  console.log('FALTAN DATOS'); }
  }

  async handleFileInput(evt: any) {
    this.loading = true;
    let cabeceraxls: Array<any> = [];
    try {
      this.filename = evt.target.files.item(0).name;
      // console.log(this.filename);
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(evt.target);
      // console.log(target);
      if (target.files.length !== 1) throw new Error('No es posible usar multiples archivos');
      const reader: FileReader = new FileReader();
      // console.log(reader);
      reader.onload = async (e: any) => {
        // console.log(e);
        /* read workbook */
        const bstr: string = await e.target.result;
        // console.log(bstr);
        const wb: XLSX.WorkBook = await XLSX.read(bstr, { type: 'binary' });
        // console.log(wb);

        /* Busca la hoja dentro del xls */
        const wsname: string = await wb.SheetNames[0];
        // console.log(wsname);
        const ws: XLSX.WorkSheet =  await wb.Sheets[wsname];
        // console.log(ws); // <- Planilla

        /* save data */
        this.data =  await <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        // console.log(this.data);
        this.preload =  true;
        cabeceraxls = this.data[0];
        console.log(cabeceraxls);
        const arr: Array<any> = this.data;
        await this.setModelplanilla(arr);
        this.data.unshift(cabeceraxls);
        this.loading = await false;
      };
      reader.readAsBinaryString(target.files[0]);
    } catch (err) {
      this.loading = false;
      // this.mensaje('danger', 'Error en la visualización', 3000);
    }
  }

  onLimpiar() {
    this.data = [];
    this.totalreg = 0;
    this.parametros = [];
    this.pForm.reset();
    this.filename = null;
    this.preload = false;
  }

  async setModelplanilla(arr: Array<any>) {
    console.log(arr);
    let esvacio = false;
    arr.splice(0, 1); /*<- elimina cabecera de planilla */
    // console.log(arr);
    const inscritos: Array<Parametros> = [];
    for (const row of arr) {
      console.log(row);
      const excelobj: Parametros = new Parametros();
      excelobj.fechacontrato = this.formatearFecha(this.datePipe.transform(this.pForm.controls.fechacontrato.value, 'dd/MM/yyyy'));
      excelobj.fechatermino = this.formatearFecha(this.datePipe.transform(this.pForm.controls.fechatermino.value, 'dd/MM/yyyy'));
      excelobj.rutempresa = Utils.formatRut(this.pForm.controls.rutempresa.value.trim());
      excelobj.nomempresa = this.pForm.controls.nomempresa.value.trim();
      excelobj.domicilioemp = this.pForm.controls.domicilioemp.value.trim();
      excelobj.nomcurso = this.pForm.controls.nomcurso.value.trim();
      excelobj.codsence = this.pForm.controls.codsence.value.trim();
      excelobj.capacitador = this.pForm.controls.capacitador.value.trim();
      excelobj.domiciliocap = this.pForm.controls.domiciliocap.value.trim();
      excelobj.modcurso = this.pForm.controls.modcurso.value.trim();
      excelobj.horariocurso = this.pForm.controls.horariocurso.value.trim();
      let i = 0;
      for (const element of row) {
        // console.log(element);
        /* crea objeto con los campos de planilla luego inserta en array */
        if (i === 0) {
          excelobj.OK = element;
        } else if (i === 1) {
          excelobj.Control1 = element;
        } else if (i === 2) {
          excelobj.Control2 = element;
        } else if (i === 3) {
          excelobj.Correlativo = element;
        } else if (i === 4) {
          excelobj.NombreParticipante = element;
        } else if (i === 5) {
          excelobj.ApellidoPaterno = element;
        } else if (i === 6) {
          excelobj.ApellidoMaterno = element;
        } else if (i === 7) {
          excelobj.Nacionalidad = element;
        }  else if (i === 8) {
          excelobj.Rut = element;
        } else if (i === 9) {
          this.prefecha = this.ExcelDateToJSDate(element);
          const predate = new DatePipe('en-US').transform(this.prefecha, 'yyyyMMdd');
          excelobj.FechaNacimiento = predate;
        } else if (i === 10) {
          const preage = this.CalculateAge(this.prefecha);
          excelobj.Edad = preage;
        } else if (i === 11) {
          excelobj.Domicilio = element;
        } else if (i === 12) {
          excelobj.Ciudad = element;
        } else if (i === 13) {
          excelobj.Correoelectronico = element;
        } else if (i === 14) {
          excelobj.Telefono = element;
        } else if (i === 15) {
          excelobj.NºdeCuenta = element;
        } else if (i === 16) {
          excelobj.Banco = element;
        } else if (i === 17) {
          excelobj.TipoCuenta = element;
        } else if (i === 18) {
          excelobj.Curso = element;
        }
        i++;
      }
      console.log(excelobj.Correlativo);
      if (excelobj.Correlativo === undefined) {
        esvacio = true;
        console.log(inscritos);
        this.parametros = inscritos;
        console.log(this.parametros);
        return;
      } else {
        inscritos.push(excelobj);
        console.log('AQUI');
        console.log(inscritos);
      }
      this.totalreg = inscritos.length;
      this.parametros = inscritos;
      this.pForm.controls.dataxls.setValue('1');
      console.log(this.totalreg);
    }
    console.log(esvacio);
    // console.log(this.archivoxls);
    console.log(inscritos);
  }

  ExcelDateToJSDate(serial) {
    const utcdays  = Math.floor(serial - 25567);
    const utcvalue = utcdays * 86400;
    const dateinfo = new Date(utcvalue * 1000);

    const fractionalday = serial - Math.floor(serial) + 0.0000001;

    let totalseconds = Math.floor(86400 * fractionalday);

    const seconds = totalseconds % 60;

    totalseconds -= seconds;

    const hours = Math.floor(totalseconds / (60 * 60));
    const minutes = Math.floor(totalseconds / 60) % 60;

    return new Date(dateinfo);
    // return new DatePipe('en-US').transform(dateinfo, 'yyyyMMdd');
  }

  CalculateAge(birthdate) {
  if (birthdate !== null) {
      const timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
      const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      return age;
    }
  }

  setModal() {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        // nomreceptor: nomemisor,
      }
    };
    return dtModal;
  }

  onCerrar() {
    this.router.navigate(['/home']);
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async onOtec(value: any) {
    console.log(value);
    let otecobj: Otec = new Otec();
    const indx = this.otecarr.findIndex( ndx => value === ndx.NomOtec);
    otecobj = this.otecarr[indx];
    this.pForm.controls.rutcap.setValue(otecobj.RutOtec);
    this.pForm.controls.domiciliocap.setValue(otecobj.DirOtec);
    console.log(this.pForm.controls.capacitador.value);
  }

  outRutempresa() {
    const rutemp = Utils.formatRut(this.pForm.controls.rutempresa.value);
    this.load = true;
    if (rutemp.length <= 0) {
      this.pForm.controls.nomempresa.reset();
      this.pForm.controls.domicilioemp.reset();
      return;
    } else {
      this.parametrosService.getEmpresa(rutemp).subscribe(async res => {
        this.empresa = res;
        this.load = false;
        this.setEmpresa();
      }, err => {
        this.alertSwalAlert.title = 'Ocurrio un Error';
        this.alertSwalAlert.show();
        this.load = false;
      });
    }
  }

  setEmpresa() {
    if (this.empresa.RutEmp === undefined || this.empresa.RutEmp === null ) {
      this.pForm.controls.nomempresa.reset();
      this.pForm.controls.domicilioemp.reset();
    } else {
      this.pForm.controls.nomempresa.setValue(this.empresa.NomEmp);
      this.pForm.controls.domicilioemp.setValue(this.empresa.DirEmp.concat(' '.concat(this.empresa.ComuEmp)));
    }
  }

  outSence() {
    const codcurso = this.pForm.controls.codsence.value;
    this.load = true;
    if (codcurso === undefined || codcurso === null) {
      this.pForm.controls.nomcurso.reset();
      this.pForm.controls.modcurso.reset();
      this.pForm.controls.horariocurso.reset();
      this.pForm.controls.duracioncurso.reset();
      return;
    } else {
      this.parametrosService.getCurso(codcurso).subscribe(async res => {
        this.curso = res;
        console.log(this.curso);
        this.load = false;
        this.setCurso();
      }, err => {
        this.alertSwalAlert.title = 'Ocurrio un Error';
        this.alertSwalAlert.show();
        this.load = false;
      });
    }
  }

  setCurso() {
    if (this.curso.CodCurso === undefined || this.curso.CodCurso === null ) {
      this.pForm.controls.nomcurso.reset();
      this.pForm.controls.modcurso.reset();
      this.pForm.controls.horariocurso.reset();
      this.pForm.controls.duracioncurso.reset();
    } else {
      this.pForm.controls.nomcurso.setValue(this.curso.NomCurso);
      this.pForm.controls.modcurso.setValue(this.curso.ModCurso);
      this.pForm.controls.horariocurso.setValue(this.curso.HorarioCurso);
      this.pForm.controls.duracioncurso.setValue(this.curso.HorasCurso);
    }
  }

  mensaje(status: string, texto: string, time: number = 0) {
    this.alerts = [];
    if (time !== 0) {
      this.alerts.push({
        type: status,
        msg: texto,
        timeout: time
      });
    } else {
      this.alerts.push({
        type: status,
        msg: texto
      });
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  async onPruebarest() {
    console.log(this.parametros);
    try {
      await this.parametrosService.postPrueba2A(this.parametros).toPromise();
      await this.onPruebarestB();
    } catch (err) {
      this.loading = false;
      this.load = false;
      this.alertSwalAlert.title = 'Error al guardar registros';
      this.alertSwalAlert.show();
    }
    // this.parametrosService.postPrueba2A(this.parametros).subscribe( async res => {
    //   // this.loading = false;
    //   // this.load = false;
    //   // this.alertSwal.title = 'Registros guardados';
    //   // this.alertSwal.show();
    //   await this.onPruebarestB();
    // }, err => {
    //   this.loading = false;
    //   this.load = false;
    //   this.alertSwalAlert.title = 'Error al guardar registros';
    //   this.alertSwalAlert.show();
    // });
  }

  async onPruebarestB() {
    this.parametrosService.getPrueba2B().subscribe( data => {
          this.descargarbinario(data);
         }, err => {
            console.log(err);
            //  if (err.error !== null) {
            this.alertSwalAlert.title = 'Debe cargar registros';
            this.alertSwalAlert.show();
            //  } else {
            //   this.alertSwalAlert.title = 'Ocurrio un Error';
            //   this.alertSwalAlert.show();
            //  }
         });
  }

  descargarbinario(resp: any) {
    console.log('DESDE descargarbinario()');
    console.log(resp);
    if (resp.headers.get('Content-Type') !== null) {
      if (resp.headers.get('Content-Disposition') !== null) {
        const acontent = resp.headers.get('Content-Disposition').split(';');
        const attachment = acontent[1].split('=');
        attachment[1] = attachment[1].toString().replace(/"/g, '');
        importedSaveAs(new Blob([resp.body], { type: resp.headers.get('Content-Disposition') }), attachment[1]);
      } else {
        this.mensaje('info', 'Sin resultados 2 / Sin Content-Disposition', 3000);
      }
    } else {
      this.mensaje('info', 'Sin resultados / Sin Content-Type', 3000);
    }
    this.getCnt();
  }

  formatearFecha(value: string) {
    const prefecha = value.split('/');
    const dia = prefecha[0];
    const mes = prefecha[1];
    const anio = prefecha[2];
    const newfecha = anio.concat(mes.concat(dia));
    return newfecha;
  }
}
