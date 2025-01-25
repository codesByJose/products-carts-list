import { useContext, useState } from "react";
import { DessertContext } from "./DessertContext";
import confirmImg from '../../assets/images/icon-order-confirmed.svg';
import { Box, Text, Img, Divider, Button } from "@chakra-ui/react";

const ConfirmationModal = ({ count, setShowModal, }) => {
    const { dessert } = useContext(DessertContext);
    const addedItems = dessert.filter((item) => count[item.name] > 0);

    const totalOrder = addedItems.reduce((acc, items) => acc + items.price * count[items.name], 0);

    const handleModal = () => {
        setShowModal(false);
    }

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="rgba(0, 0, 0, 0.5)"
            zIndex="1000"
        >
            <Box
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="lg"
                width="90%"
                maxWidth="500px"
            >
                <Box>
                    <Img src={confirmImg} alt="Order Confirmed" />
                    <Text fontSize={"2.5em"} fontWeight={700} color={"hsl(14, 65%, 9%)"} mt={4}>Order Confirmed</Text>
                    <Text color={"hsl(12, 20%, 44%)"}>We hope you enjoy your food!</Text>
                    <Box bg={" hsl(13, 31%, 94%)"} p={6} mt={4}>
                        {addedItems.map((items) => (
                            <>
                                <Box key={items.name} display={"flex"} justifyContent={"space-between"} alignItems={"center"} pb={4}>


                                    <Box display={"flex"} alignItems={"center"}>
                                        <Box pr={3}>
                                            <Img src={items.image.thumbnail} alt={items.name} w={50} borderRadius={5} />
                                        </Box>
                                        <Box pl={2} >
                                            <Text color={"hsl(14, 65%, 9%)"} fontWeight={600} fontSize={"0.9em"}>{items.category}</Text>
                                            <Box display={"flex"} pt={2} alignItems={"center"}>
                                                <Text pr={4} color={"hsl(14, 86%, 42%)"} fontWeight={600} fontSize={"0.9em"}>{count[items.name]}x</Text>
                                                <Text fontSize={"0.9em"} color={"hsl(7, 20%, 60%)"} fontWeight={500} > @{(items.price).toFixed(2)}</Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        ${((items.price) * count[items.name]).toFixed(2)}
                                    </Box>




                                </Box>
                                <Divider mb={3} />
                            </>

                        ))}
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Text color={"hsl(14, 65%, 9%)"} fontSize={"0.9em"}>Order Total </Text>
                            <Text color={"hsl(14, 65%, 9%)"} fontWeight={700} fontSize={"1.6em"}>${totalOrder.toFixed(2)}</Text>
                        </Box>
                    </Box>
                </Box>
                <Button bg={"hsl(14, 86%, 42%)"} _hover={{bg: "hsl(14, 86%, 42%)" }} mt={5} w={"100%"} p={6} borderRadius={30} color={"white"} onClick={handleModal}>Start New Order</Button>
            </Box>

        </Box>
    );
};

export default ConfirmationModal;