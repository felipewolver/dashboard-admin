import { useMemo } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { useSelector } from "react-redux";
import { themeSettings } from "theme";

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  
  const mode = useSelector((state) => state.global.mode);
  
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routes>
              <Route element={<Layout />} />
              <Route path="/" element={< Navigate to='/dashboard' replace />} />

            </Routes>

        </ThemeProvider>
      </BrowserRouter>
    
    </div>
  )
}

export default App
