class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { 'MACACO': 3 } },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: {} },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { 'GAZELA': 1 } },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: {} },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { 'LEAO': 1 } },
    ];

    this.animais = {
      'LEAO': { tamanho: 3, bioma: 'savana' },
      'LEOPARDO': { tamanho: 2, bioma: 'savana' },
      'CROCODILO': { tamanho: 3, bioma: 'rio' },
      'MACACO': { tamanho: 2, bioma: ['savana', 'floresta'] },
      'GAZELA': { tamanho: 2, bioma: 'savana' },
      'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'] },
    };
  }

  validarEntrada(animal, quantidade) {
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }
    if (isNaN(quantidade) || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }
    return null;
  }

  analisaRecintos(animal, quantidade) {
    const erroValidacao = this.validarEntrada(animal, quantidade);
    if (erroValidacao) {
      return erroValidacao;
    }
  
    const { tamanho, bioma } = this.animais[animal];
    const biomas = Array.isArray(bioma) ? bioma : [bioma];
    const recintosViaveis = [];
  
    for (const recinto of this.recintos) {
      if (biomas.includes(recinto.bioma) && this.podeAcomodar(recinto, animal, quantidade)) {
        const espacoLivre = recinto.tamanhoTotal - (quantidade * tamanho) - this.calcularEspacoOcupado(recinto);
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
      }
    }
  
    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }
  
    return { recintosViaveis: recintosViaveis.sort() };
  }
  

  podeAcomodar(recinto, animal, quantidade) {
    const tamanhoAnimal = this.animais[animal].tamanho;
    const espacoNecessario = quantidade * tamanhoAnimal;
    return espacoNecessario <= (recinto.tamanhoTotal - this.calcularEspacoOcupado(recinto));
  }
  
  calcularEspacoOcupado(recinto) {
    let espaco = 0;
    for (const especie in recinto.animaisExistentes) {
      espaco += recinto.animaisExistentes[especie] * this.animais[especie].tamanho;
    }
    return espaco;
  }
  

  temMaisDeUmaEspecie(recinto) {
    return Object.keys(recinto.animaisExistentes).length > 1;
  }
}

export { RecintosZoo as RecintosZoo };
