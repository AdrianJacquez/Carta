const CODE_LENGTH = 4;

const NUMBERS = [1,2,3,4,5,6,7,8,9];

export function generateSecret() {

    const available = [...NUMBERS];

    const secret = [];

    while(secret.length < CODE_LENGTH){

        const index = Math.floor(Math.random()*available.length);

        secret.push(available[index]);

        available.splice(index,1);

    }

    return secret;

}

export function evaluateGuess(secret, guess){

    let exact = 0;

    let misplaced = 0;

    for(let i=0;i<secret.length;i++){

        if(secret[i]===guess[i]){

            exact++;

        }
        else if(secret.includes(guess[i])){

            misplaced++;

        }

    }

    return{
        exact,
        misplaced
    }

}

export function clueText(result){

    if(result.exact===0 && result.misplaced===0){

        return "Ninguno de esos números pertenece al código.";

    }

    if(result.exact>0 && result.misplaced===0){

        return `${result.exact} número(s) están exactamente donde deben estar.`;

    }

    if(result.exact===0 && result.misplaced>0){

        return `${result.misplaced} número(s) pertenecen al código, pero están en la posición equivocada.`;

    }

    return `${result.exact} están en el lugar correcto y ${result.misplaced} pertenecen al código, pero no a esa posición.`;

}

const secret = [4,8,2,7];

console.log(
evaluateGuess(
secret,
[4,7,2,9]
));