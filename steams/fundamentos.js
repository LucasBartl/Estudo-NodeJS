/*  -------Tipos de Streams-----------

Readable Streams : Ex, A planilha que foi realizada o upload, vai ser lida aos poucos.

Write Streams :Ex, Netflix/Spotify. Onde são enviadas ao front aos poucs informações aos poucos.
*/

/* 
//Tudo que recebe como entrada esta sendo encaminhada para uma saida 
process.stdin
.pipe(process.stdout);
 */

//--------------Stream de LEITURA------------------\\
import { Readable, Writable, Transform } from 'node:stream';


class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);

            } else {
                const buf = Buffer.from(String(i))
                this.push(buf);
            }
        }, 1000)
    };
}

// Stream de Transformação dos dados 

class InverseNumberStream extends Transform {

    _transform(chuck, encoding, callback) {

        const transformed = Number(chuck.toString() * -1);

        callback(null, Buffer.from(String(transformed)));
    }


}


// Criando nossa Stream de escrita 

class MultiplyByStream extends Writable {

    _write(chunk, encoding, callback) {
        //Nunca se retorna dados dentro de uma Stream de escrita
        console.log(Number(chunk.toString()) * 10);
        callback()

    }
}






new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByStream());