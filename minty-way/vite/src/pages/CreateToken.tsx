import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import CreateTokenModal from "../components/CreateTokenModal";
import templateData from "../data/templateData.json";
import useToastNotification from "../hooks/useToastNotification";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const CreateToken: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const { signer } = useOutletContext<OutletContext>();
  const { showToast } = useToastNotification();

  const handleCreateToken = () => {
    if (!signer) {
      showToast("지갑 연결 후 이용해주세요.", "", "error");
      return;
    }

    if (selectedTemplateIndex !== null) {
      onOpen();
    } else {
      alert("템플릿이 선택되지 않았습니다.");
    }
  };

  const handleBoxClick = (index: number) => {
    setSelectedTemplateIndex(index);
  };

  return (
    <>
      <Flex
        w="100%"
        h="85vh"
        p={4}
        my={8}
        mt={12}
        maxH="100vh"
        flexDir="column"
        justifyContent="flex-start"
        alignItems="center"
        bgColor="backgroundColor"
        color="white"
      >
        <Box
          w="80%"
          h="85vh"
          p={6}
          borderRadius="lg"
          bgColor="boxColor"
          boxShadow="lg"
          border="3px solid"
          borderColor="teal"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Text fontSize="2xl" fontWeight="bold">
              토큰 생성
            </Text>
            <Button
              bgColor="teal"
              w="170px"
              _hover={{ bgColor: "teal.400" }}
              onClick={handleCreateToken}
            >
              <Text color="white" fontWeight="bold" fontSize="20px">
                생성
              </Text>
            </Button>
          </Flex>
          <Divider mb={4} borderColor="gray.600" />
          <Grid templateColumns="repeat(12, 1fr)" mb={4}>
            <GridItem colSpan={2}>
              <Text fontSize="lg" fontWeight="bold" color="gray.400">
                토큰 이름
              </Text>
            </GridItem>
            <GridItem colSpan={2} ml={4}>
              <Text fontSize="lg" fontWeight="bold" color="gray.400">
                토큰 속성
              </Text>
            </GridItem>
            <GridItem colSpan={7} ml={6}>
              <Text fontSize="lg" fontWeight="bold" color="gray.400">
                속성 설명
              </Text>
            </GridItem>
          </Grid>
          <Divider mb={8} borderColor="white" />
          <Flex flexDir="column" gap={8}>
            {templateData.map((v, i) => (
              <Box
                key={i}
                w="full"
                h="200px"
                p="4"
                borderRadius="md"
                boxShadow="lg"
                border={`1px solid ${
                  selectedTemplateIndex === i ? "teal" : "white"
                }`}
                bgColor={selectedTemplateIndex === i ? "teal.800" : "boxColor"}
                cursor="pointer"
                onClick={() => handleBoxClick(i)}
                transition="background-color 0.3s ease"
              >
                <Grid templateColumns="repeat(12, 1fr)" h="full" gap={6}>
                  <GridItem colSpan={2}>
                    <VStack h="full" justifyContent="center">
                      <Text fontSize="2xl" fontWeight="bold" color="white">
                        {v.template}
                      </Text>
                      <Text fontSize="lg" fontWeight="bold">
                        {v.price}
                      </Text>
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Box
                      h="full"
                      bgColor="boxColor"
                      borderRadius="md"
                      border="2px solid"
                      borderColor="teal"
                    >
                      <Flex
                        flexDir="column"
                        alignItems="center"
                        justifyContent="center"
                        h="full"
                      >
                        {v.properties.map((property, index) => (
                          <Text
                            key={index}
                            fontSize="20px"
                            color="white"
                            textAlign="center"
                          >
                            {property.key}
                          </Text>
                        ))}
                      </Flex>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={8}>
                    <Box
                      h="full"
                      bgColor="boxColor"
                      borderRadius="md"
                      border="2px solid"
                      borderColor="teal"
                    >
                      <Flex
                        flexDir="column"
                        ml={8}
                        justifyContent="center"
                        h="full"
                      >
                        {v.properties.map((property, index) => (
                          <Flex key={index} alignItems="center">
                            <Text
                              fontSize="20px"
                              color="white"
                              textAlign="center"
                            >
                              {property.description}
                            </Text>
                          </Flex>
                        ))}
                      </Flex>
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
      <CreateTokenModal
        isOpen={isOpen}
        onClose={onClose}
        templateIndex={selectedTemplateIndex}
      />
    </>
  );
};

export default CreateToken;
