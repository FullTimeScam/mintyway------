import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import NewTokenCard from "../components/NewTokenCard";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const [imageSrc, setImageSrc] = useState("../public/token_create.webp");
  const navigator = useNavigate();

  return (
    <Flex w="100%" h="94vh" flexDir="column" bgColor="backgroundColor">
      <Flex
        flexGrow={0.8}
        borderBottomColor="dark-gray"
        borderBottomWidth="2px"
      >
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          flexGrow={0.75}
          p={4}
        >
          <Text
            w="100%"
            textAlign="center"
            alignSelf="center"
            width="800px"
            mb={12}
            color="white"
            fontWeight="bold"
            fontSize="20px"
          >
            <Text fontSize="100px" fontWeight="bold" mb={16} color="white">
              Minty Way
            </Text>
            <Box as="span" color="teal.400" fontSize="20px" fontWeight="bold">
              로렘 입숨
            </Box>{" "}
            돌로르 시트 아멧, 컨센터 아디핀시스 엘리트. 비바무스 라키니아 오디오
            비타에 베스틸룸. 섭텐디세 포텐티. 우트 아이드 렉투스 아 리굴라
            다푸비스 볼루파트. 인테거 논 주스토 오르시.{" "}
            <Box as="span" color="teal.400" fontSize="20px" fontWeight="bold">
              크라스 인테르덤
            </Box>{" "}
            라쿠스 논 엑스 딕텀, 네크 바리우스 니시 알리에트. 널라 파실리시.
            파셀루스 앳 사기티스 엘리트. 남 악 셈퍼 라쿠스. 넙 벨 오디오 유
            주스토 파우키부스 에피시투르.
          </Text>

          <Button
            background="none"
            p={0}
            _hover={{ transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.95)" }}
            onMouseOver={() => setImageSrc("../public/token_create2.webp")}
            onMouseOut={() => setImageSrc("../public/token_create.webp")}
            onClick={() => navigator("/createToken")}
          >
            <Image
              src={imageSrc}
              alt="token_create"
              w="250px"
              position="relative"
            />
            <Text
              color="white"
              position="absolute"
              fontSize="30px"
              fontWeight="bold"
            >
              토큰 생성
            </Text>
          </Button>
        </Flex>
        <Flex flexGrow={0.3} justifyContent="center" alignItems="center">
          <Image
            src="../public/coin.png"
            alt="coin"
            width="400px"
            height="400px"
            mr={12}
            className="animated-image"
          />
        </Flex>
      </Flex>
      <Flex
        flexGrow={0.2}
        justifyContent="center"
        alignItems="center"
        gap={4}
        p={4}
      >
        <NewTokenCard />
      </Flex>
    </Flex>
  );
};

export default Home;
