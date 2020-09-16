/*------------   Codigo de Usuario ---------*/
//------> Paquetes,importaciones
//package com.tesis.util;
import java_cup.runtime.*;
import java.util.LinkedList;

/*------------   Opciones y Declaraciones ---------*/
%%
%{
    //----> Codigo de usuario en sintaxis java

    public static LinkedList<TError> TablaEL = new LinkedList<TError>(); 
%}

//-------> Directivas
/*public.- Causa que la clase del analizador lÃ©xico creada por JLex sea pÃºblica.
  class.- Almacena en al variable entera yycharel Ã­ndice del primer caracter del token reconocido
  cupsym.- Son los simbolos que le enviamos a cup.Ponemos el nombre de la variable que va contener esos simbolos
  cup.- cambia al modo de compatibilidad CUP para interactuar con un analizador generado por CUP
  char.- Activa el contador de caracteres
  column.- lleve control de las columnas
  full.- Permite extender el alfabeto bÃ¡sico de 128 caracteres, a un alfabeto con valores de 8 bits.
  ignorecase.- Genera un analizador lÃ©xico que no distingue mayÃºsculas de minÃºsculas
  line.- Almacena en la variable entera yyline el Ã­ndice de la primera lÃ­nea del token reconocido
  unicode.- Permite extender el alfabeto para incluir el alfabeto Unicode de 16 bits.

*/
%public 
%class Analizador_Lexico
%cupsym Simbolos
%cup
%char
%column
%full
%ignorecase
%line
%unicode

//------> Expresiones Regulares
numero = [0-9]+
verbo = [a-zA-Z]+r
adverbio = [D|d]onde
preposicion= ([E|e]ntre|a|desde|hasta|con|en|de|datos)
//-----> pronombres personales Ã¡tonos segun la rae
proposicion = ([l|L][o|a]s|[U|u]n[o|a]s)
sustantivo = [A-Z][a-z]*
conjuncion=([,|y|o|e|u])
fecha=([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))
adjetivo = [O|o]rdenado

//------> Estados

%%
/*------------   Reglas Lexicas ---------*/

//-----> Simbolos

<YYINITIAL> "+"         { System.out.println("Reconocio "+yytext()+" mas"); return new Symbol(Simbolos.mas, yycolumn, yyline, yytext()); }
<YYINITIAL> "*"         { System.out.println("Reconocio "+yytext()+" por"); return new Symbol(Simbolos.por, yycolumn, yyline, yytext()); }
<YYINITIAL> "/"         { System.out.println("Reconocio "+yytext()+" div"); return new Symbol(Simbolos.div, yycolumn, yyline, yytext()); }
<YYINITIAL> "("         { System.out.println("Reconocio "+yytext()+" para"); return new Symbol(Simbolos.para, yycolumn, yyline, yytext()); }
<YYINITIAL> ")"         { System.out.println("Reconocio "+yytext()+" parc"); return new Symbol(Simbolos.parc, yycolumn, yyline, yytext()); }
<YYINITIAL> "="         { System.out.println("Reconocio "+yytext()+" igual"); return new Symbol(Simbolos.igual, yycolumn, yyline, yytext()); }
<YYINITIAL> ">"         { System.out.println("Reconocio "+yytext()+" mayor"); return new Symbol(Simbolos.mayor, yycolumn, yyline, yytext()); }
<YYINITIAL> "<"         { System.out.println("Reconocio "+yytext()+" menor"); return new Symbol(Simbolos.menor, yycolumn, yyline, yytext()); }
//-------> Simbolos ER
<YYINITIAL> {numero}    { System.out.println("Reconocio "+yytext()+" num"); return new Symbol(Simbolos.num, yycolumn, yyline, yytext()); }
<YYINITIAL> {verbo}    { System.out.println("Reconocio "+yytext()+" verbo"); return new Symbol(Simbolos.verbo, yycolumn, yyline, yytext()); }
<YYINITIAL> {adverbio}    { System.out.println("Reconocio "+yytext()+" adverbio"); return new Symbol(Simbolos.adverbio, yycolumn, yyline, yytext()); }
<YYINITIAL> {preposicion}    { System.out.println("Reconocio "+yytext()+" preposicion"); return new Symbol(Simbolos.preposicion, yycolumn, yyline, yytext()); }
<YYINITIAL> {proposicion}    { System.out.println("Reconocio "+yytext()+" proposicion"); return new Symbol(Simbolos.proposicion, yycolumn, yyline, yytext()); }
<YYINITIAL> {sustantivo}    { System.out.println("Reconocio "+yytext()+" sustantivo"); return new Symbol(Simbolos.sustantivo, yycolumn, yyline, yytext()); }
<YYINITIAL> {conjuncion}    { System.out.println("Reconocio "+yytext()+" conjuncion"); return new Symbol(Simbolos.conjuncion, yycolumn, yyline, yytext()); }
<YYINITIAL> {fecha}    { System.out.println("Reconocio "+yytext()+" fecha"); return new Symbol(Simbolos.fecha, yycolumn, yyline, yytext()); }
<YYINITIAL> {adjetivo}    { System.out.println("Reconocio "+yytext()+" adjetivo"); return new Symbol(Simbolos.adjetivo, yycolumn, yyline, yytext()); }
//------> Espacios
[ \t\r\n\f]             {/* Espacios en blanco, se ignoran */}

//------> Errores Lexicos
.                       { System.out.println("Error Lexico"+yytext()+" Linea "+yyline+" Columna "+yycolumn);
                          TError datos = new TError(yytext(),yyline,yycolumn,"Error Lexico","Simbolo no existe en el lenguaje");
                          TablaEL.add(datos);}
