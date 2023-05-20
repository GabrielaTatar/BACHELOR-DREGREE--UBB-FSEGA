import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const USER_TOKEN = 'auth-user-token';
const USER_TYPE = 'auth-user-type';
const USER_ID = 'auth-user-id';
const PACIENT_ID = 'pacient-id';
const USER_MEDICAL_FILE_ID = 'auth-medical-file-id';
const USER_DOCTOR_ID = 'auth-doctor-id';
const USER_MEDICAL_CADRE_ID = 'auth-medical-cadre-id';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public saveUser(user_token: any): void {
    window.sessionStorage.removeItem(USER_TOKEN);
    window.sessionStorage.removeItem(USER_TYPE);
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.removeItem(PACIENT_ID);
    window.sessionStorage.removeItem(USER_MEDICAL_FILE_ID);
    window.sessionStorage.removeItem(USER_DOCTOR_ID);
    window.sessionStorage.removeItem(USER_MEDICAL_CADRE_ID);
    const tokenAsString = JSON.stringify(user_token);
    const tokenInfo = this.getDecodedAccessToken(JSON.parse(tokenAsString).token); // decode token
    const user_type = tokenInfo.user_type;
    const user_id = tokenInfo.user_id;
    const pacient_id = tokenInfo.pacient_id;
    const fisa_medicala_id = tokenInfo.fisa_medicala_id
    const doctor_id = tokenInfo.doctor_id
    const cadru_medical_id = tokenInfo.cadru_medical_id

    //set items in session
    window.sessionStorage.setItem(USER_TOKEN, tokenAsString);
    window.sessionStorage.setItem(USER_TYPE, user_type);
    window.sessionStorage.setItem(USER_ID, user_id);
    window.sessionStorage.setItem(PACIENT_ID, pacient_id);
    window.sessionStorage.setItem(USER_MEDICAL_FILE_ID, fisa_medicala_id);
    window.sessionStorage.setItem(USER_DOCTOR_ID, doctor_id);
    window.sessionStorage.setItem(USER_MEDICAL_CADRE_ID, cadru_medical_id);
  }



  public getUserToken(): any {
    const user = window.sessionStorage.getItem(USER_TOKEN);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getUserType(): any {
    const user_type = window.sessionStorage.getItem(USER_TYPE);
    if (user_type) {
      if(user_type === 'psiholog' || user_type === 'doctor' || user_type === 'nutritionist')
        return 'cadru_medical';
      else if(user_type === 'pacient')
        return 'pacient';
    }

    return {};
  }

  public getUserByID(): any {
    const user_id = window.sessionStorage.getItem(USER_ID);
    if (user_id) {
      return JSON.parse(user_id);
    }

    return {};
  }

  public getPatientByID(): any {
    const patient_id = window.sessionStorage.getItem(PACIENT_ID);
    if (patient_id) {
      return JSON.parse(patient_id);
    }

    return {};
  }

  public getUserMedicalFileId(): any {
    const medical_file = window.sessionStorage.getItem(USER_MEDICAL_FILE_ID);
    if (medical_file) {
      return JSON.parse(medical_file);
    }

    return {};
  }

  public getUserDoctorId(): any {
    const user_doctorId= window.sessionStorage.getItem(USER_DOCTOR_ID);
    if (user_doctorId) {
      return JSON.parse(user_doctorId);
    }

    return {};
  }

  public getUserMedicalCadreId(): any {
    const medical_cadre = window.sessionStorage.getItem(USER_MEDICAL_CADRE_ID);
    if (medical_cadre) {
      return JSON.parse(medical_cadre);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_TOKEN);
    if (user) {
      return true;
    }

    return false;
  }
}
