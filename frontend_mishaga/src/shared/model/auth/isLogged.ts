export class isLogged {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static instance: any;
    static isAuth: boolean;
    constructor() {
      localStorage.setItem('isLogged', 'false')
      // Подобно 'кольцу всевластья'
      if (isLogged.instance) {
        return isLogged.instance;
      }
      isLogged.instance = this;
    
      Object.freeze(this);
    }
    static get() {
      return localStorage.getItem('isLogged') === 'true' ? true : false
    }
    static set(data: boolean) {
        localStorage.setItem('isLogged', String(data))
    }
  } 