export class Empresa {
    RutEmp: string;
    NomEmp: string;
    DirEmp: string;
    ComuEmp: string;
    DotaEmp: string;
    constructor(
        RutEmp?: string,
        NomEmp?: string,
        DirEmp?: string,
        ComuEmp?: string,
        DotaEmp?: string
    ) {
        this.RutEmp = RutEmp;
        this.NomEmp = NomEmp;
        this.DirEmp = DirEmp;
        this.ComuEmp = ComuEmp;
        this.DotaEmp = DotaEmp;
    }
}