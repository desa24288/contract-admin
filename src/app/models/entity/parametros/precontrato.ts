export class Precontrato {
    fechacontrato: string;
    fechatermino: string;
    rutempresa: string;
    nomempresa: string;
    domicilioemp: string;
    nomcurso: string;
    codsence: string;
    capacitador: string;
    domiciliocap: string;
    modcurso: string;
    horariocurso: string;
    NombreParticipante: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Nacionalidad: string;
    Rut: string;
    FechaNacimiento: string;
    Edad: string;
    Domicilio: string;
    Ciudad: string;
    Curso: string;

    constructor(
        fechacontrato?: string,
        fechatermino?: string,
        rutempresa?: string,
        nomempresa?: string,
        domicilioemp?: string,
        nomcurso?: string,
        codsence?: string,
        capacitador?: string,
        domiciliocap?: string,
        modcurso?: string,
        horariocurso?: string,
        NombreParticipante?: string,
        ApellidoPaterno?: string,
        ApellidoMaterno?: string,
        Nacionalidad?: string,
        Rut?: string,
        FechaNacimiento?: string,
        Edad?: string,
        Domicilio?: string,
        Ciudad?: string,
        Curso?: string
    ) {
        this.fechacontrato = fechacontrato;
        this.fechatermino = fechatermino;
        this.rutempresa = rutempresa;
        this.nomempresa = nomempresa;
        this.domicilioemp = domicilioemp;
        this.nomcurso = nomcurso;
        this.codsence = codsence;
        this.capacitador = capacitador;
        this.domiciliocap = domiciliocap;
        this.modcurso = modcurso;
        this.horariocurso = horariocurso;
        this.NombreParticipante = NombreParticipante;
        this.ApellidoPaterno = ApellidoPaterno;
        this.ApellidoMaterno = ApellidoMaterno;
        this.Nacionalidad = Nacionalidad;
        this.Rut = Rut;
        this.FechaNacimiento = FechaNacimiento;
        this.Edad = Edad;
        this.Domicilio = Domicilio;
        this.Ciudad = Ciudad;
        this.Curso = Curso;
    }
}