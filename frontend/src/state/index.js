import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mode: 'dark', // o initialState q tem a prop mode atribuida q vai iniciar com a cor do tema de fundo dark
    userId: "63701cc1f03239b7f700000e"
};

// globalSlice vai fazer a configuração iniciais do Redux.
export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMode: (state) => { // reducer setMode vai alterar o tema de fundo para dark ou light onde tem a função=> anônima como parametro (state) q pega a prop mode da initialState
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
});

export const { setMode } = globalSlice.actions;


export default globalSlice.reducer;