var fortuneCookies = [
    'conquer your fears or they will conquer you.',
    'rivers need springs.',
    'do not fear what you don\'t know.',
    'you will have a pleasant surprise.',
    'keep it simple stupid.',
    'stick with your wife.',
    'you will find happiness with a new love',
    'I hope people get the Simpons reference'
];

exports.getFortune = function(){
    var idx = Math.floor( Math.random() * fortuneCookies.length );
    return fortuneCookies[idx];
};
