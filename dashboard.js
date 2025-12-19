// Toggle Valores
const originalValor = document.getElementById("valor").textContent;
function toggleValor() {
  const valor = document.getElementById("valor");
  const icone = document.getElementById("icone");
  if (valor.textContent === "***") { valor.textContent = originalValor; icone.classList.replace("bi-eye-slash","bi-eye"); }
  else { valor.textContent = "***"; icone.classList.replace("bi-eye","bi-eye-slash"); }
}

const originalValor1 = document.getElementById("valor1").textContent;
function toggleValor1() {
  const valor = document.getElementById("valor1");
  const icone = document.getElementById("icone1");
  if (valor.textContent === "***") { valor.textContent = originalValor1; icone.classList.replace("bi-eye-slash","bi-eye"); }
  else { valor.textContent = "***"; icone.classList.replace("bi-eye","bi-eye-slash"); }
}

// Gráfico
const ctx = document.getElementById('vendasHoraDia').getContext('2d');
const horas = Array.from({length:24},(_,i)=>i+":00");
const diasSemana = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

function gerarVendasDia(data){ return Array.from({length:24},()=>Math.floor(Math.random()*15)); }

const hoje = new Date();
document.getElementById('dataSelect').valueAsDate = hoje;
document.getElementById('diaVisual').textContent = diasSemana[hoje.getDay()];

let datasetAtual = {
  label:`Vendas de ${diasSemana[hoje.getDay()]}`,
  data: gerarVendasDia(hoje),
  borderColor:'rgb(75,192,192)',
  backgroundColor:'rgba(75,192,192,0.2)',
  fill:true,
  tension:0.3,
  pointRadius:4
};

let grafico = new Chart(ctx,{
  type:'line',
  data:{labels:horas,datasets:[datasetAtual]},
  options:{
    responsive:true,
    maintainAspectRatio:false,
    scales:{
      y:{beginAtZero:true,title:{display:true,text:'Número de Vendas'}},
      x:{title:{display:true,text:'Horas do Dia'}}
    }
  }
});

// Tema
const toggleBtn = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');

function aplicarTemaSalvo() {
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme==='dark'){
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('bi-sun','bi-moon');
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.classList.replace('bi-moon','bi-sun');
  }
}
aplicarTemaSalvo();

toggleBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
  const temaAtual = document.body.classList.contains('dark-mode') ? 'dark':'light';
  localStorage.setItem('theme',temaAtual);
  aplicarTemaSalvo();
});

// Gráfico por data
document.getElementById('diaVisual').addEventListener('click',()=>{
  document.getElementById('dataSelect').showPicker();
});
document.getElementById('dataSelect').addEventListener('change',function(){
  const data = new Date(this.value);
  datasetAtual.data = gerarVendasDia(data);
  datasetAtual.label = `Vendas de ${diasSemana[data.getDay()]}`;
  grafico.update();
  document.getElementById('diaVisual').textContent = diasSemana[data.getDay()];
});
