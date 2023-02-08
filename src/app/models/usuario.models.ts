
export class Usuario{

  // static fromFirebase( {email, uid, nombre}: Usuario){
  //   return new Usuario(uid, nombre, email);
  // }

  static fromFirebase( {uid, nombre, email }: {uid: string, nombre: string, email: string } ) {
    return new Usuario(uid, nombre, email);
}

  constructor(
    public uid: string,
    public nombre: string,
    public email:string)
    {}

}
