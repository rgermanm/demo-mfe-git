import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MenuService {


  private  menu: MenuElement[]=[
   {
     "name": "Cotizaciones",
     "childs": [
       {
         "name": "Certificados",
         "childs": [
           {
             "name": "Certificados de cobertura",
             "childs": [
               {
                 "name": "Automotores (post emisión)",
                 "url": "https//:"
               },
               {
                 "name": "Mercosur",
                 "url": "https/:"
               },
               {
                 "name": "Integral de consorcio",
                 "childs": [
                   {
                     "name": "Ascensores",
                     "url": "https/:"
                   },
                   {
                     "name": "Calderas/Termotanques",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Integral de comercio",
                 "childs": [
                   {
                     "name": "Carteles",
                     "url": "asdasd"
                   },
                   {
                     "name": "Ascensores y/o montacargas",
                     "url": "https/"
                   },
                   {
                     "name": "Inst. a vapor, agua caliente o aceite",
                     "url": "https/"
                   },
                   {
                     "name": "Responsabilidad civil comprensiva",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Accidentes personales",
                 "url": "https"
               },
               {
                 "name": "Vida obiligatoria",
                 "url": "https"
               },
               {
                 "name": "Vida colectiva",
                 "url": "https"
               },
               {
                 "name": "Asistencia en viaje",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Certificados de pago",
             "childs": [
               {
                 "name": "Pólizas c/tarjeta",
                 "url": "https"
               },
               {
                 "name": "Pólizas s/tarjeta(cert.pago)",
                 "url": "https"
               },
               {
                 "name": "Cert. pólizas empleados",
                 "url": "https"
               }
             ]
           }
         ]
       },
       {
         "name": "Consulta",
         "childs": [
           {
             "name": "Caución",
             "childs": [
               {
                 "name": "Pólizas caución",
                 "url": "https"
               },
               {
                 "name": "Listado facturación",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Por agente",
             "url": "https//:"
           },
           {
             "name": "Por asegurado",
             "url": "https//:"
           },
           {
             "name": "Por póliza",
             "url": "https//:"
           },
           {
             "name": "Por factura",
             "url": "https//:"
           },
           {
             "name": "Por patente",
             "url": "https//:"
           },
           {
             "name": "Grupo",
             "url": "https//:"
           }
         ]
       },
       {
         "name": "Cruce cartera",
         "url": "https//:"
       },
       {
         "name": "Hoja PASS",
         "url": "https//:"
       },
       {
         "name": "Libros rubricados",
         "childs": [
           {
             "name": "Rubrica manual",
             "url": "https//:"
           },
           {
             "name": "Rubrica digital",
             "childs": [
               {"name": "Rubrica manual",
               "url": "https//:"}
             ]
           }
         ]
       },
       {
         "name": "Programa retención cartera 2017",
         "childs": [
           {
             "name": "Consultas de salgo",
             "url": "https/:"
           },
           {
             "name": "Detalle movimientos",
             "url": "https/:"
           },
           {
             "name": "ABM retención cartera",
             "url": "https/:"
           }
         ]
       },
       {
         "name": "Tablero emisión",
         "url": "https//"
       },
       {
         "name": "Pólizas",
         "url": "https//"
       }
     ]
   },
   {
     "name": "Producción",
     "childs": [
       {
         "name": "Certificados",
         "childs": [
           {
             "name": "Certificados de cobertura",
             "childs": [
               {
                 "name": "Automotores (post emisión)",
                 "url": "https//:"
               },
               {
                 "name": "Mercosur",
                 "url": "https/:"
               },
               {
                 "name": "Integral de consorcio",
                 "childs": [
                   {
                     "name": "Ascensores",
                     "url": "https/:"
                   },
                   {
                     "name": "Calderas/Termotanques",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Integral de comercio",
                 "childs": [
                   {
                     "name": "Carteles",
                     "url": "asdasd"
                   },
                   {
                     "name": "Ascensores y/o montacargas",
                     "url": "https/"
                   },
                   {
                     "name": "Inst. a vapor, agua caliente o aceite",
                     "url": "https/"
                   },
                   {
                     "name": "Responsabilidad civil comprensiva",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Accidentes personales",
                 "url": "https"
               },
               {
                 "name": "Vida obiligatoria",
                 "url": "https"
               },
               {
                 "name": "Vida colectiva",
                 "url": "https"
               },
               {
                 "name": "Asistencia en viaje",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Certificados de pago",
             "childs": [
               {
                 "name": "Pólizas c/tarjeta",
                 "url": "https"
               },
               {
                 "name": "Pólizas s/tarjeta(cert.pago)",
                 "url": "https"
               },
               {
                 "name": "Cert. pólizas empleados",
                 "url": "https"
               }
             ]
           }
         ]
       },
       {
         "name": "Consulta",
         "childs": [
           {
             "name": "Caución",
             "childs": [
               {
                 "name": "Pólizas caución",
                 "url": "https"
               },
               {
                 "name": "Listado facturación",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Por agente",
             "url": "https//:"
           },
           {
             "name": "Por asegurado",
             "url": "https//:"
           },
           {
             "name": "Por póliza",
             "url": "https//:"
           },
           {
             "name": "Por factura",
             "url": "https//:"
           },
           {
             "name": "Por patente",
             "url": "https//:"
           },
           {
             "name": "Grupo",
             "url": "https//:"
           }
         ]
       },
       {
         "name": "Cruce cartera",
         "url": "https//:"
       },
       {
         "name": "Hoja PASS",
         "url": "https//:"
       },
       {
         "name": "Libros rubricados",
         "childs": [
           {
             "name": "Rubrica manual",
             "url": "https//:"
           },
           {
             "name": "Rubrica digital",
             "childs": [
               {"name": "Rubrica manual",
               "url": "https//:"}
             ]
           }
         ]
       },
       {
         "name": "Programa retención cartera 2017",
         "childs": [
           {
             "name": "Consultas de salgo",
             "url": "https/:"
           },
           {
             "name": "Detalle movimientos",
             "url": "https/:"
           },
           {
             "name": "ABM retención cartera",
             "url": "https/:"
           }
         ]
       },
       {
         "name": "Tablero emisión",
         "url": "https//"
       },
       {
         "name": "Pólizas",
         "url": "https//"
       }
     ]
   },
   {
     "name": "Siniestros",
     "childs": [
       {
         "name": "Certificados",
         "childs": [
           {
             "name": "Certificados de cobertura",
             "childs": [
               {
                 "name": "Automotores (post emisión)",
                 "url": "https//:"
               },
               {
                 "name": "Mercosur",
                 "url": "https/:"
               },
               {
                 "name": "Integral de consorcio",
                 "childs": [
                   {
                     "name": "Ascensores",
                     "url": "https/:"
                   },
                   {
                     "name": "Calderas/Termotanques",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Integral de comercio",
                 "childs": [
                   {
                     "name": "Carteles",
                     "url": "asdasd"
                   },
                   {
                     "name": "Ascensores y/o montacargas",
                     "url": "https/"
                   },
                   {
                     "name": "Inst. a vapor, agua caliente o aceite",
                     "url": "https/"
                   },
                   {
                     "name": "Responsabilidad civil comprensiva",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Accidentes personales",
                 "url": "https"
               },
               {
                 "name": "Vida obiligatoria",
                 "url": "https"
               },
               {
                 "name": "Vida colectiva",
                 "url": "https"
               },
               {
                 "name": "Asistencia en viaje",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Certificados de pago",
             "childs": [
               {
                 "name": "Pólizas c/tarjeta",
                 "url": "https"
               },
               {
                 "name": "Pólizas s/tarjeta(cert.pago)",
                 "url": "https"
               },
               {
                 "name": "Cert. pólizas empleados",
                 "url": "https"
               }
             ]
           }
         ]
       },
       {
         "name": "Consulta",
         "childs": [
           {
             "name": "Caución",
             "childs": [
               {
                 "name": "Pólizas caución",
                 "url": "https"
               },
               {
                 "name": "Listado facturación",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Por agente",
             "url": "https//:"
           },
           {
             "name": "Por asegurado",
             "url": "https//:"
           },
           {
             "name": "Por póliza",
             "url": "https//:"
           },
           {
             "name": "Por factura",
             "url": "https//:"
           },
           {
             "name": "Por patente",
             "url": "https//:"
           },
           {
             "name": "Grupo",
             "url": "https//:"
           }
         ]
       },
       {
         "name": "Cruce cartera",
         "url": "https//:"
       },
       {
         "name": "Hoja PASS",
         "url": "https//:"
       },
       {
         "name": "Libros rubricados",
         "childs": [
           {
             "name": "Rubrica manual",
             "url": "https//:"
           },
           {
             "name": "Rubrica digital",
             "childs": [
               {"name": "Rubrica manual",
               "url": "https//:"}
             ]
           }
         ]
       },
       {
         "name": "Programa retención cartera 2017",
         "childs": [
           {
             "name": "Consultas de salgo",
             "url": "https/:"
           },
           {
             "name": "Detalle movimientos",
             "url": "https/:"
           },
           {
             "name": "ABM retención cartera",
             "url": "https/:"
           }
         ]
       },
       {
         "name": "Tablero emisión",
         "url": "https//"
       },
       {
         "name": "Pólizas",
         "url": "https//"
       }
     ]
   },
   {
     "name": "Gestión interna",
     "childs": [
       {
         "name": "Certificados",
         "childs": [
           {
             "name": "Certificados de cobertura",
             "childs": [
               {
                 "name": "Automotores (post emisión)",
                 "url": "https//:"
               },
               {
                 "name": "Mercosur",
                 "url": "https/:"
               },
               {
                 "name": "Integral de consorcio",
                 "childs": [
                   {
                     "name": "Ascensores",
                     "url": "https/:"
                   },
                   {
                     "name": "Calderas/Termotanques",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Integral de comercio",
                 "childs": [
                   {
                     "name": "Carteles",
                     "url": "asdasd"
                   },
                   {
                     "name": "Ascensores y/o montacargas",
                     "url": "https/"
                   },
                   {
                     "name": "Inst. a vapor, agua caliente o aceite",
                     "url": "https/"
                   },
                   {
                     "name": "Responsabilidad civil comprensiva",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Accidentes personales",
                 "url": "https"
               },
               {
                 "name": "Vida obiligatoria",
                 "url": "https"
               },
               {
                 "name": "Vida colectiva",
                 "url": "https"
               },
               {
                 "name": "Asistencia en viaje",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Certificados de pago",
             "childs": [
               {
                 "name": "Pólizas c/tarjeta",
                 "url": "https"
               },
               {
                 "name": "Pólizas s/tarjeta(cert.pago)",
                 "url": "https"
               },
               {
                 "name": "Cert. pólizas empleados",
                 "url": "https"
               }
             ]
           }
         ]
       },
       {
         "name": "Consulta",
         "childs": [
           {
             "name": "Caución",
             "childs": [
               {
                 "name": "Pólizas caución",
                 "url": "https"
               },
               {
                 "name": "Listado facturación",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Por agente",
             "url": "https//:"
           },
           {
             "name": "Por asegurado",
             "url": "https//:"
           },
           {
             "name": "Por póliza",
             "url": "https//:"
           },
           {
             "name": "Por factura",
             "url": "https//:"
           },
           {
             "name": "Por patente",
             "url": "https//:"
           },
           {
             "name": "Grupo",
             "url": "https//:"
           }
         ]
       },
       {
         "name": "Cruce cartera",
         "url": "https//:"
       },
       {
         "name": "Hoja PASS",
         "url": "https//:"
       },
       {
         "name": "Libros rubricados",
         "childs": [
           {
             "name": "Rubrica manual",
             "url": "https//:"
           },
           {
             "name": "Rubrica digital",
             "childs": [
               {"name": "Rubrica manual",
               "url": "https//:"}
             ]
           }
         ]
       },
       {
         "name": "Programa retención cartera 2017",
         "childs": [
           {
             "name": "Consultas de salgo",
             "url": "https/:"
           },
           {
             "name": "Detalle movimientos",
             "url": "https/:"
           },
           {
             "name": "ABM retención cartera",
             "url": "https/:"
           }
         ]
       },
       {
         "name": "Tablero emisión",
         "url": "https//"
       },
       {
         "name": "Pólizas",
         "url": "https//"
       }
     ]
   },
   {
     "name": "Favoritos",
     "childs": [
       {
         "name": "Certificados",
         "childs": [
           {
             "name": "Certificados de cobertura",
             "childs": [
               {
                 "name": "Automotores (post emisión)",
                 "url": "https//:"
               },
               {
                 "name": "Mercosur",
                 "url": "https/:"
               },
               {
                 "name": "Integral de consorcio",
                 "childs": [
                   {
                     "name": "Ascensores",
                     "url": "https/:"
                   },
                   {
                     "name": "Calderas/Termotanques",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Integral de comercio",
                 "childs": [
                   {
                     "name": "Carteles",
                     "url": "asdasd"
                   },
                   {
                     "name": "Ascensores y/o montacargas",
                     "url": "https/"
                   },
                   {
                     "name": "Inst. a vapor, agua caliente o aceite",
                     "url": "https/"
                   },
                   {
                     "name": "Responsabilidad civil comprensiva",
                     "url": "https/"
                   }
                 ]
               },
               {
                 "name": "Accidentes personales",
                 "url": "https"
               },
               {
                 "name": "Vida obiligatoria",
                 "url": "https"
               },
               {
                 "name": "Vida colectiva",
                 "url": "https"
               },
               {
                 "name": "Asistencia en viaje",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Certificados de pago",
             "childs": [
               {
                 "name": "Pólizas c/tarjeta",
                 "url": "https"
               },
               {
                 "name": "Pólizas s/tarjeta(cert.pago)",
                 "url": "https"
               },
               {
                 "name": "Cert. pólizas empleados",
                 "url": "https"
               }
             ]
           }
         ]
       },
       {
         "name": "Consulta",
         "childs": [
           {
             "name": "Caución",
             "childs": [
               {
                 "name": "Pólizas caución",
                 "url": "https"
               },
               {
                 "name": "Listado facturación",
                 "url": "https"
               }
             ]
           },
           {
             "name": "Por agente",
             "url": "https//:"
           },
           {
             "name": "Por asegurado",
             "url": "https//:"
           },
           {
             "name": "Por póliza",
             "url": "https//:"
           },
           {
             "name": "Por factura",
             "url": "https//:"
           },
           {
             "name": "Por patente",
             "url": "https//:"
           },
           {
             "name": "Grupo",
             "url": "https//:"
           }
         ]
       },
       {
         "name": "Cruce cartera",
         "url": "https//:"
       },
       {
         "name": "Hoja PASS",
         "url": "https//:"
       },
       {
         "name": "Libros rubricados",
         "childs": [
           {
             "name": "Rubrica manual",
             "url": "https//:"
           },
           {
             "name": "Rubrica digital",
             "childs": [
               {"name": "Rubrica manual",
               "url": "https//:"}
             ]
           }
         ]
       },
       {
         "name": "Programa retención cartera 2017",
         "childs": [
           {
             "name": "Consultas de salgo",
             "url": "https/:"
           },
           {
             "name": "Detalle movimientos",
             "url": "https/:"
           },
           {
             "name": "ABM retención cartera",
             "url": "https/:"
           }
         ]
       },
       {
         "name": "Tablero emisión",
         "url": "https//"
       },
       {
         "name": "Pólizas",
         "url": "https//"
       }
     ]
   }
  ];

  constructor() {



   }

getMenu():MenuElement[]{

    return this.menu;

}



}

export interface MenuElement{

     name?:string;
     childs?:MenuElement[];
     url?:string;

}
