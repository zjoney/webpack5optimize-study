function a(){
    console.log('a');
    b();
    c();
}
function b(){
    console.log('b');
}
function c(){
    console.log('c');
}

function a(){
    console.log('a');
    console.log('b');
    console.log('c');
}