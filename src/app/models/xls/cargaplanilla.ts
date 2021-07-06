import { Archivoxls } from '../xls/archivoxls';

export class Cargaplanilla {
    licencias: Array<Archivoxls>;

    constructor(
        licencias?: Array<Archivoxls>
    ) {
        this.licencias = licencias;
    }

}