export class Curso {
    CodCurso: string;
    NomCurso: string;
    ModCurso: string;
    HorarioCurso: string;
    HorasCurso: string;
    constructor(
        CodCurso?: string,
        NomCurso?: string,
        ModCurso?: string,
        HorarioCurso?: string,
        HorasCurso?: string
    ) {
        this.CodCurso = CodCurso;
        this.NomCurso = NomCurso;
        this.ModCurso = ModCurso;
        this.HorarioCurso = HorarioCurso;
        this.HorasCurso = HorasCurso;
    }
}