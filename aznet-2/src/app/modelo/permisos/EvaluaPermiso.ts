import { authConfig } from 'src/app/config/auth-config';
import { Injectable } from '@angular/core';

@Injectable()
export class EvaluaPermiso {

    private permissions: string[];
    private hasPermission: boolean;

    public getPermissions(): string[] {
        return this.permissions;
    }
    public setPermissions(value: string[]) {
        this.permissions = value;
    }
    private getHasPermission(): boolean {
        return this.hasPermission;
    }
    private setHasPermission(value: boolean) {
        this.hasPermission = value;
    }

    public evaluarPermisos(permissions: string[]): boolean {
        this.evaluar(permissions);
        return this.getHasPermission();
    }

    private evaluar(permissions: string[]) {
        let Match = [];

        permissions.forEach(permisos => {

            authConfig.permissions.forEach(csmPermiso => {
                if (csmPermiso == permisos) {

                    //CONDICION POR SI VIENE REPETIDO EL PERMISO
                    if (Match.length > 0) {
                        Match.forEach(per => {
                            if (per != permisos) {
                                Match.push(permisos);
                            }
                        })
                    } else {
                        Match.push(permisos);
                    }
                }
            })
        });

        if (Match.length == permissions.length) {
            this.setHasPermission(true)
        } else {
            this.setHasPermission(false);
        }
    }
} 