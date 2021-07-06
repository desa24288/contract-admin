export class Archivoxls {
    OK: string;
    Control1: string;
    Control2: string;
    Correlativo: string;
    NombreParticipante: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Nacionalidad: string;
    Rut: string;
    FechaNacimiento: string;
    Edad: string;
    Domicilio: string;
    Ciudad: string;
    Correoelectronico: string;
    Telefono: string;
    NºdeCuenta: string;
    Banco: string;
    TipoCuenta: string;
    Curso: string;

    constructor(
        OK?: string,
        Control1?: string,
        Control2?: string,
        Correlativo?: string,
        NombreParticipante?: string,
        ApellidoPaterno?: string,
        ApellidoMaterno?: string,
        Nacionalidad?: string,
        Rut?: string,
        FechaNacimiento?: string,
        Edad?: string,
        Domicilio?: string,
        Ciudad?: string,
        Correoelectronico?: string,
        Telefono?: string,
        NºdeCuenta?: string,
        Banco?: string,
        TipoCuenta?: string,
        Curso?: string
    ) {
        this.OK = OK;
        this.Control1 = Control1;
        this.Control2 = Control2;
        this.Correlativo = Correlativo;
        this.NombreParticipante = NombreParticipante;
        this.ApellidoPaterno = ApellidoPaterno;
        this.ApellidoMaterno = ApellidoMaterno;
        this.Nacionalidad = Nacionalidad;
        this.Rut = Rut;
        this.FechaNacimiento = FechaNacimiento;
        this.Edad = Edad;
        this.Domicilio = Domicilio;
        this.Ciudad = Ciudad;
        this.Correoelectronico = Correoelectronico;
        this.Telefono = Telefono;
        this.NºdeCuenta = NºdeCuenta;
        this.Banco = Banco;
        this.TipoCuenta = TipoCuenta;
        this.Curso = Curso;
    }
}