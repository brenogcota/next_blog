export const hasOwnDeepProperty = (obj: any, prop: string) => {
    if (typeof obj === 'object' && obj !== null) {
      if (obj.hasOwnProperty(prop)) {           
        return true;
      }
      for (var p in obj) {                        
        if (obj.hasOwnProperty(p) &&               
            hasOwnDeepProperty(obj[p], prop)) { 
          return true;
        }
      }
    }
    return false;                                  
}
