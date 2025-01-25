import  DessertProvider  from "./Components/DessertContext"
import DessertDetails from "./Components/DessertDetails";
import { ChakraProvider, Container, Box } from '@chakra-ui/react';


function App() {
  return(
    <>
    <ChakraProvider>
        <DessertProvider>
 
          <Box display={{base:"column", md:"flex", sm:"column"}} fontFamily={"Red Hat Text"} justifyContent={"center"}  alignContent={"center"}  p={10} bg="hsl(13, 31%, 94%)">
            <Box w={"100%"}  >
              <DessertDetails/>
            </Box>
          </Box>
        </DessertProvider>
    </ChakraProvider>
      
    </>
  )
}

export default App
