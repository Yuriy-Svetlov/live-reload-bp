
import './css/1.css';
import './css/2.css';

// Uncomment for Error (Webpack)
//import './css/123.css';

const 
  $script1 = document.getElementById("script1"),
  $script2 = document.getElementById("script2");

$script1.innerHTML = '<div style="width: 30%;" class="script1"></div>';
$script2.innerHTML = '<div style="width: 50%;" class="script2"></div>';

// Uncomment for Warning (ESLint)
//let wwd = 123;

// Uncomment for Error (ESLint)
//function(){}
