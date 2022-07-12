import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
        name: 'iconPipe'
})
export class AccesosDirectosIconPipe implements PipeTransform {

        transform(iconName: string): string {
                switch (iconName) {

                        case 'vehiculo':
                        case 'car':
                        case 'auto':
                                return 'car';
                                break;
                        case 'personales':
                                return 'home';
                                break;
                        case 'vida':
                                return 'heart';
                                break;
                        case 'industriales':
                                return 'industry';
                                break;
                        case 'trofeo':
                                return 'trophy';
                                break;
                        case 'caucion':
                                return 'umbrella';
                                break;

                        case 'certificados':
                                return 'suitcase';
                                break;

                        case 'cartera':
                                return 'check-square';
                                break;
                        case 'vouchers':
                                return 'clipboard';
                                break;
                        case 'cobranzas':
                                return 'coins';
                                break;
                        case 'cuenta_coriente':
                                return 'money-bill-wave';
                                break;
                        case 'caja':
                                return 'cash-register';
                                break;
                        case 'asistencia':
                                return 'tools';
                                break;
                        case 'proveedores':
                                return 'user-friends';
                                break;
                        case 'administacion':
                                return 'clipboard-list';
                                break;
                        case 'abm_inspectores':
                                return 'users';
                                break;
                        case 'atencion_usuario':
                                return 'headset';
                                break;
                        case 'mail':
                                return 'envelope';
                                break;
                        case 'reaseguros':
                                return 'handshake';
                                break;
                        case 'PEG':
                                return 'comment-dots';
                                break;
                        case 'ahorro':
                                return 'hand-holding-usd';
                                break;
                        default:
                                return 'home';
                                break;

                }


        }

}
