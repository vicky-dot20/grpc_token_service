export interface LoggerService {
  info : (message: string| unknown)=> void;
  error : (message: string| unknown)=> void;
  warning : (message: string| unknown)=> void;
  debug : (message: string| unknown)=> void;
}