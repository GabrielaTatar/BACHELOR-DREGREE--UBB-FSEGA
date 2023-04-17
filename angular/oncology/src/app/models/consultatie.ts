export interface Consultatie {
  id_consultatie: number;
  data: Date;
  simptome: string;
  diagnostic: string;
  durata: number;
  pret: number;
  schema_tratament: string;
  formular_de_prescriptie_id_formular: number;
  fisa_medicala_id_fisa: number;
  cadre_medicale_id_cadru: number;
}
