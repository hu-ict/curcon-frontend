export namespace AuthNameSpace {

  export class HRefDto {
    href: string;
  }

  export class Functie {
    id: number;
    name: string;
    href: string;
  }
  export class FunctiePostDto {
    name: string;
  }

  export class Module {
    id: number;
    name: string;
    functies:	HRefDto;
    href: string;
  }
  export class ModulePostDto {
    name: string;
  }
  export class Rol{
    id: number;
    name: string;
    modules: HRefDto;
    href: string;
  }
  export class RolPostDto {
    name: string;
  }
  export class User{
    username: string;
    role:HRefDto;
    href: string;
  }
  export class UserPostDto {
    username: string;
  }
}
