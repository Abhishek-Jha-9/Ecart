import { Button, VStack, Text, Image } from "@chakra-ui/react";
const Card = ({ amount, img, checkouthandler }) => {
  return (
    <VStack>
      <Image src={img} boxSize="200px" borderRadius="10px" alt="product" />
      <Text fontSize="xl" fontWeight="bold" fontFamily="monospace">
        Rs.{amount}
      </Text>
      <Button onClick={() => checkouthandler(amount)} colorScheme="teal">
        Checkout
      </Button>
    </VStack>
  );
};

export default Card;
