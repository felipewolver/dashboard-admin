import { Box, useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";

import { useGetGeographyQuery } from "../../state/api";
import { geoData } from "../../state/geo";
import Header from "../../components/Header";



const Geography = () => {
    
    const theme = useTheme();

    const { data } = useGetGeographyQuery(); //console.log(data);


    return (
        <Box m="1.5rem 2.5rem">
            <Header title="GEOGRAPHY" subtitle="Encontre onde seus usuários estão localizado." />
            <Box mt="40xp" 
                height="75vh"
                border={`1px solid ${theme.palette.secondary[200]}`}
                borderRadius="4px"
            >     
                {data ? 
                    const MyResponsiveGeoMapCanvas = () => (
                    <ResponsiveGeoMapCanvas
                        features="/* please have a look at the description for usage */"
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        projectionTranslation={[ 0.5, 0.5 ]}
                        projectionRotation={[ 0, 0, 0 ]}
                        fillColor="#eeeeee"
                        borderWidth={0.5}
                        borderColor="#333333"
                        enableGraticule={true}
                        graticuleLineColor="#666666"
    />
) : <> Loading... </> } {/* Se tem data renderiza senão renderiza o Loading... */}

            </Box>

        </Box>
    );
}


export default Geography