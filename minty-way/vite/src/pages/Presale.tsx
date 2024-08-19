import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import Search from "../components/Search";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import { formatDateInKorean } from "../utils/formatDateInKorean";

const Presale: FC = () => {
  const { presaleList } = useOutletContext<OutletContext>();
  const navigator = useNavigate();

  const handlePresaleClick = (presale: IPresale) => {
    navigator(`/presale/${presale.name}`, { state: presale });
  };

  return (
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
        bg="boxColor"
        boxShadow="lg"
        border="3px solid"
        borderColor="teal"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Text fontSize="2xl" fontWeight="bold">
            프리세일
          </Text>
          <Search width="300px" placeholder="프리세일 검색" />
        </Flex>
        <Divider mb={4} borderColor="gray.600" />
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={8}
          justifyContent="center"
          alignItems="center"
          className="styled-scrollbar"
        >
          {presaleList.map((v, i) => (
            <GridItem key={i} w="100%" h="auto">
              <Flex
                flexDir="column"
                bgColor="boxColor"
                p={4}
                borderRadius="lg"
                alignItems="center"
                cursor="pointer"
                border="2px solid"
                borderColor="white"
                onClick={() => handlePresaleClick(v)}
                _hover={{ bgColor: "gray.800", borderColor: "teal" }}
              >
                <Image
                  src={typeof v.image === "string" ? v.image : undefined}
                  alt={v.name}
                  w="full"
                  h="200px"
                  objectFit="cover"
                  borderRadius="lg"
                  mb={4}
                />
                <Text fontWeight="bold" fontSize="28px" textAlign="center">
                  {v.name}
                </Text>
                <Flex justifyContent="space-between" w="100%" mt={2}>
                  <Text fontWeight="bold" fontSize="18px">
                    시작 시간
                  </Text>
                  <Text fontWeight="bold" fontSize="18px">
                    {formatDateInKorean(v.subscriptionStartTime)}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" w="100%" mt={2}>
                  <Text fontWeight="bold" fontSize="18px">
                    종료 시간
                  </Text>
                  <Text fontWeight="bold" fontSize="18px">
                    {formatDateInKorean(v.redemptionTime)}
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Presale;
