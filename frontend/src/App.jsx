import { useMemo } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { useSelector } from "react-redux";
// themeSettings vindo do arquivo theme.js onde tem as configurações de cor de fundo e cor da fonte do texto
import { themeSettings } from "./theme";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scenes/Dashboard";
import Layout from "./scenes/Layout";


function App() {
  
  const mode = useSelector((state) => state.global.mode); // o parâmetro state da função anônima pega a prop mode da initialState q estah em globalSlice lah da pasta state.
  
  /* theme vai ser usado em ThemeProvider como uma prop. para ser enviado para
     outros components. O createTheme() vair criar themeSettings() q possui 
     as configs de cor recebendo como parametro mode para iniciar o tema de 
     fundo de initialState q eh uma prop vinda da funçao globalSlice da pasta state */
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routes>
              <Route element={<Layout />} > {/* Route Layout vai englobar todas as páginas do app */}
                <Route path="/" element={<Navigate to='/dashboard' replace />} /> {/* path='/' Dashboard eh a página principal do projeto em localhost:5173/ */}
                <Route path='/dashboard' element={<Dashboard />} />
              
              </Route>

            </Routes>

        </ThemeProvider>
      </BrowserRouter>
    
    </div>
  )
}

export default App
