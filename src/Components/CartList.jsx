import { useContext, useState } from "react";
import React from "react";
import { DessertContext } from "./DessertContext";
import emptyCart from '../../assets/images/illustration-empty-cart.svg';
import { Box, Button, Divider, Img, Text } from '@chakra-ui/react';
import removeImg from '../../assets/images/icon-remove-item.svg';
import carbonImg from '../../assets/images/icon-carbon-neutral.svg';
import ConfirmationModal from "./ConfirmationModal";

const CartList = ({ count, setCount, addedItems }) => {
    const { dessert } = useContext(DessertContext);
     addedItems = dessert.filter((item) => count[item.name] > 0);
     const [showModal, setShowModal] = useState(false);
    // total

    const totalCount = Object.values(count).reduce((acc, curr) => acc + curr, 0);

    // total order

    const totalOrder = addedItems.reduce((acc, items) => acc + items.price * count[items.name], 0);
    // handleDelete
    const handleDelete = (itemName) => {
        setCount((prevCount) => {
            const newCount = { ...prevCount };
            delete newCount[itemName];
            return newCount;
        });
    }

    const handleShowModal = () => {
        setShowModal(!showModal);
    }


    return (
        <Box display={"flex"} flexDir={"column"} w={"100%"} p={7} bg={"hsl(20, 50%, 98%)"} borderRadius={10}>
            <>
                <Text fontSize={"1.5em"} color={"hsl(14, 86%, 42%)"} fontWeight={700}>
                    Your Cart ({totalCount})
                </Text>

                {addedItems.length > 0 ? (
                    addedItems.map((items) => (

                        <React.Fragment key={items.name}>
                            <Box key={items.name} display={"flex"} w={"100%"} p={3} justifyContent={"space-between"} alignItems={"center"} borderRadius={10} mt={3} >
                                <Box display={"flex"} flexDir={"column"} justifyContent={"space-between"} >
                                    <Box >
                                        <Text fontSize={"0.9em"} fontWeight={600} color={"hsl(14, 65%, 9%)"}>
                                            {items.category}
                                        </Text>
                                    </Box>

                                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} fontSize={"0.9em"} mt={2} >
                                        <Text fontWeight={600} color={" hsl(14, 86%, 42%)"}>
                                            x {count[items.name]}
                                        </Text>

                                        <Text fontWeight={500} color={"hsl(14, 25%, 72%)"} ml={4}>
                                            @${items.price.toFixed(2)}
                                        </Text>
                                        <Text fontWeight={550} color={"hsl(12, 20%, 44%)"} ml={2}>
                                            ${(items.price * count[items.name]).toFixed(2)}
                                        </Text>
                                    </Box>
                                </Box>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"}  >
                                    <Img src={removeImg} p={1} borderRadius={"50%"} color={"hsl(12, 20%, 44%)"} 
                                    border={"1px solid hsl(12, 20%, 44%)"} w={5} h={5} _hover={{border: "1px solid hsl(14, 65%, 9%)", color: " hsl(14, 65%, 9%)", cursor: "pointer"}}
                                    onClick={() => handleDelete(items.name)} />
                                </Box>
                            </Box>
                            <Divider mt={3} mb={3} borderColor="gray.200" />

                        </React.Fragment>

                    ))

                ) : (
                    <Box w={"100%"} h={200} display={"flex"} flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>
                        <img src={emptyCart} alt="Empty Cart" />
                        <Text color={"hsl(12, 20%, 44%)"} fontSize={"0.9em"} fontWeight={600}>
                            Your added carts will appear here
                        </Text>
                    </Box>

                )}
            </>


            {addedItems.length > 0 && (
                <>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={3}>
                        <Text fontSize={"0.9em"} color={"hsl(14, 65%, 9%)"}> Order Total </Text>
                        <Text fontSize={"1.7em"} fontWeight={700} color={"hsl(14, 65%, 9%)"}>  ${totalOrder.toFixed(2)} </Text>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={3} bg={"hsl(13, 31%, 94%)"} p={3} borderRadius={4}>
                        <Img src={carbonImg} mr={2} />
                        <Text fontSize={"0.9em"} color={"hsl(12, 20%, 44%)"} fontWeight={600}>
                            This is a
                            <Text as={"span"} color={"hsl(14, 65%, 9%)"}> carbon-neutral </Text>
                            delivery
                        </Text>
                    </Box>
                    <Button mt={7} color={"white"} bg={"hsl(14, 86%, 42%)"} borderRadius={50} p={6}
                    _hover={{bg:  "hsl(14, 80.70%, 32.50%)"}} onClick={handleShowModal}>Confirm Order</Button>

                </>

            )}
            
          
      {showModal && (
        <ConfirmationModal count={count} setShowModal={setShowModal} />
      )}
        </Box>
    );
};

export default CartList;