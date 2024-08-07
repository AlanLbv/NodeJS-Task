//representação do espaço na memoria do pc, usado para transitar dados e depois serem removidos
//ler parcialmente de forma binária
//é uma API que resolve a carencia que o javascript apresenta por não conseguir ler dados binários

const buf = Buffer.from('ok')
console.log(buf);