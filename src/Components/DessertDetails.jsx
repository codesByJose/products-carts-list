import { useContext, useState } from "react";
import { DessertContext } from "./DessertContext";
import { Box, Button, Img, Text } from "@chakra-ui/react";
import cartImage from "../../public/assets/images/icon-add-to-cart.svg"
import increment from "../../public/assets/images/icon-increment-quantity.svg"
import decrement from "../../public/assets/images/icon-decrement-quantity.svg"
import CartList from "./CartList";






const DessertDetails = () => {
  const { dessert } = useContext(DessertContext);
  const [count, setCount] = useState({});
  const [showItems, setShowItems] = useState(dessert.reduce((acc, item) => ({ ...acc, [item.name]: true }), {}));


  const handleAddToCart = (itemName) => {
    setShowItems((prevShowItems) => {
      return dessert.reduce((acc, item) => {
        acc[item.name] = item.name !== itemName;
        return acc;
      }, {});
    });
  };
  const handleIncrement = (itemName) => {
    setCount((prevCount) => ({ ...prevCount, [itemName]: (prevCount[itemName] || 0) + 1 }))
  }
  const handleDecrement = (itemName) => {
    setCount((prevCount) => ({ ...prevCount, [itemName]: Math.max((prevCount[itemName] || 0) - 1, 0) }))
  }


  return (
    <Box w={"100%"} display={{ base: "column", md: "flex", sm: "column" }} >

      <Box flexBasis={"60%"}  >
        <Text fontSize={"3em"} pb={4} fontWeight={700} color={"hsl(14, 65%, 9%)"}>Dessert</Text>
        <Box w={"100%"} display={"grid"} gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", sm: "repeat(2, 1fr)" }} gridGap={2} >
          {dessert.map((items) => {
            return (
              <Box key={items.name} >
                <Box key={items.name} display="flex" flexDirection={"column"} position={"relative"} w={300} borderRadius={10} >
                  <Img src={items.image.desktop} alt={items.name} w={{ base: "100%", md: 250, sm: "250" }} borderRadius={10} _hover={{ border: "2px solid hsl(14, 86%, 42%)", transition: "8s ease out" }} />
                  {showItems[items.name] ? (
                    <Button position={"absolute"} bottom={"-14%"} left={{ base: "50%", md: "42%", sm: "50%" }} transform="translate(-50%, -50%)" border="1.5px solid hsl(7, 20%, 60%)"
                      zIndex={1} borderRadius={50} bg={"hsl(20, 50%, 98%)"} _hover={{ color: "hsl(14, 86%, 42%)", bg: " white", border: "1px solid hsl(14, 86%, 42%)" }}
                      fontSize={15} _focus={{ color: "hsl(14, 86%, 42%)" }}
                      onClick={() => handleAddToCart(items.name)} >
                      <Img src={cartImage} alt="cart" mr={2} />
                      Add to cart
                    </Button>
                  ) : (
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} position={"absolute"} bottom={"-19%"} left={{ base: "50%", md: "42%", sm: "50%" }} transform="translate(-50%, -50%)" border="1.5px solid hsl(7, 20%, 60%)"
                      zIndex={1} borderRadius={50} bg={"hsl(14, 86%, 42%)"} fontSize={15}   >
                      <Button bg={"none"} _hover={{ bg: "transparent" }} onClick={() => handleIncrement(items.name)}>
                        <Img src={increment} alt="cart" borderRadius={"50%"} border={"2px solid white"} width="20px" height="20px" p={1} m={1} _hover={{ color: "hsl(14, 86%, 42%)" }} />
                      </Button>
                      <Text color={"white"} fontSize={"1em"} fontWeight={600} p={2} m={1}>{count[items.name] || 0}</Text>
                      <Button bg={"none"} _hover={{ bg: "transparent" }} onClick={() => handleDecrement(items.name)}>
                        <Img src={decrement} alt="cart" borderRadius={"50%"} border={"2px solid white"} width="20px" height="20px" p={1} m={1} />
                      </Button>
                    </Box>

                  )
                  }


                </Box >
                <Box pt={10} pb={7}>
                  <Text color={"hsl(12, 20%, 44%)"} fontSize={"1em"}>{items.category}</Text>
                  <Text color={"hsl(14, 63.30%, 11.80%)"} fontSize={"1.1em"} fontWeight={600} letterSpacing={2}>{items.name}</Text>
                  <Text color={"hsl(14, 86%, 42%)"} fontSize={"1.1em"} fontWeight={600}>${items.price.toFixed(2)}</Text>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
      <Box flexBasis={"40%"} >
        <CartList count={count} setCount={setCount} setShowItems={setShowItems} />
      </Box>
    </Box>
  )
}

export default DessertDetails
