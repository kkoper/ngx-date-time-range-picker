import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor() {}

  getTranslation(key: string): string {
    return `${key}`;
  }
}
