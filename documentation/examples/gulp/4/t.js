



function mainFolder(main, path){
	const regExp = new RegExp("^" + main + "[\\s\\S]+$","g");

    return regExp.test(path);
}



let str = 'src/scss/1/_1.scss';

console.log(mainFolder('src/scss/1/', str));