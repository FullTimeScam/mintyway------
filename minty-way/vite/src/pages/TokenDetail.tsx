import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Progress,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { TbCircleX, TbCircleCheck } from "react-icons/tb";
import {
  CopyAddressButton,
  ExternalDiscordButton,
  ExternalGithubButton,
  ExternalLinkButton,
  ExternalRightArrowButton,
  ExternalTelegramButton,
  ExternalWebsiterButton,
  ExternalWhitepaperButton,
  ExternalXButton,
} from "../utils/iconButtons";
import useToastNotification from "../hooks/useToastNotification";
import HolderPieChart from "../components/HolderPieChart";
import HolderAreaChart from "../components/HolderAreaChart";
import { OutletContext } from "../components/Layout";
import CreatePresaleModal from "../components/CreatePresaleModal";

const TokenDetail: FC = () => {
  const location = useLocation();
  const token = location.state;
  const { showToast } = useToastNotification();
  const { presaleList } = useOutletContext<OutletContext>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasTokenAddress, setHasTokenAddress] = useState<boolean>(false);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    showToast(
      "주소 복사됨",
      "컨트랙트 주소가 클립보드에 복사되었습니다.",
      "success"
    );
  };

  useEffect(() => {
    setHasTokenAddress(
      presaleList.some(
        (presale) => presale.tokenAddress === token.token_address
      )
    );
    console.log(presaleList);
  }, [presaleList]);

  useEffect(() => console.log(hasTokenAddress), [hasTokenAddress]);

  return (
    <>
      <Flex
        w="100%"
        h="85vh"
        p={4}
        justifyContent="center"
        alignItems="center"
        my={8}
        mt={12}
        maxH="100vh"
        color="white"
        gap={8}
      >
        <Flex
          w="50%"
          h="82vh"
          borderRadius="lg"
          bgColor="boxColor"
          boxShadow="lg"
          border="3px solid"
          borderColor="teal"
          flexDir="column"
          position="relative"
        >
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <Image
              position="absolute"
              top={-12}
              src={token.logo}
              alt={token.name}
              border="4px"
              borderColor="teal"
              borderRadius="full"
              w="120px"
              h="120px"
            />
            <Text fontWeight="bold" fontSize="24px" mt={20}>
              {token.name}
            </Text>
            <Text fontWeight="bold" fontSize="18px">
              {Number(token.balance).toLocaleString()} {token.symbol}
            </Text>
          </Flex>
          <Box position="absolute" top={4} right={8}>
            <ExternalLinkButton href={token.token_address} size="md" />
          </Box>
          <Flex
            gap={2}
            justifyContent="end"
            mr={8}
            position="absolute"
            top={4}
            left={8}
          >
            <ExternalGithubButton href="https://github.com" size="md" />
            <ExternalXButton href="https://x.com/" size="md" />
            <ExternalTelegramButton
              href="https://web.telegram.org/"
              size="md"
            />
            <ExternalDiscordButton href="https://discord.com/" size="md" />
            <ExternalWhitepaperButton href="https://google.com" size="md" />
            <ExternalWebsiterButton href="https://google.com/" size="md" />
          </Flex>
          <Divider mt={4} borderColor="gray.600" />
          <Flex
            flexDir="column"
            h="100%"
            alignItems="center"
            justifyContent="center"
            gap={4}
            p={8}
          >
            <Box
              w="100%"
              bgColor="gray.800"
              p={4}
              border="2px"
              borderColor="teal"
              borderRadius="md"
              mt={4}
            >
              <Text fontWeight="bold" fontSize="20px" mb={2}>
                토큰 주소
              </Text>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="24px">
                  {token.token_address}
                </Text>
                <CopyAddressButton
                  address={token.token_address}
                  size="sm"
                  onCopy={handleCopyAddress}
                />
              </Flex>
            </Box>
            <Box
              w="100%"
              bgColor="gray.800"
              p={4}
              border="2px"
              borderColor="teal"
              borderRadius="md"
              mt={4}
            >
              <Text fontWeight="bold" fontSize="20px" mb={2}>
                Owner 주소
              </Text>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="24px">
                  {"0x3Af9E6986077D98d5cC492046460F8FCc629DF31"}
                </Text>
                <CopyAddressButton
                  address={token.contractAddress}
                  size="sm"
                  onCopy={handleCopyAddress}
                />
              </Flex>
            </Box>
            <Flex gap={6} alignItems="center">
              <Flex flexDir="column" gap={1}>
                <Flex
                  flexDir="column"
                  justifyContent="center"
                  w="270px"
                  h="125px"
                  bgColor="gray.800"
                  p={4}
                  border="2px"
                  borderColor="teal"
                  borderRadius="md"
                  mt={4}
                >
                  <Text fontWeight="bold" fontSize="20px" mb={2}>
                    발행량
                  </Text>
                  <Text fontWeight="bold" fontSize="24px">
                    5,423,123
                  </Text>
                </Flex>
                <Flex
                  flexDir="column"
                  justifyContent="center"
                  w="270px"
                  h="125px"
                  bgColor="gray.800"
                  p={4}
                  border="2px"
                  borderColor="teal"
                  borderRadius="md"
                  mt={4}
                >
                  <Text fontWeight="bold" fontSize="20px" mb={2}>
                    최대 발행량
                  </Text>
                  <Text fontWeight="bold" fontSize="24px">
                    1,000,000,000
                  </Text>
                </Flex>
              </Flex>
              <Box
                w="270px"
                h="fit-content"
                bgColor="gray.800"
                p={4}
                border="2px"
                borderColor="teal"
                borderRadius="md"
                mt={4}
              >
                <Text fontWeight="bold" fontSize="20px" mb={2}>
                  홀더 비율
                </Text>
                <HolderPieChart />
              </Box>
              <Box
                w="270px"
                h="fit-content"
                bgColor="gray.800"
                p={4}
                border="2px"
                borderColor="teal"
                borderRadius="md"
                mt={4}
              >
                <Text fontWeight="bold" fontSize="20px" mb={2}>
                  홀더 수
                </Text>
                <Flex w="full" h="200px">
                  <HolderAreaChart />
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDir="column" w="25%" gap={6}>
          <Flex
            h="40vh"
            p={4}
            borderRadius="lg"
            bgColor="boxColor"
            boxShadow="lg"
            border="3px solid"
            borderColor="teal"
            flexDir="column"
          >
            <Flex alignItems="center" justifyContent="space-between" mb={4}>
              <Text fontSize="24px" fontWeight="bold">
                프리세일
              </Text>
              <ExternalRightArrowButton href="https://presale" size="md" />
            </Flex>
            <Divider borderColor="gray.600" />
            <Flex
              flexDir="column"
              h="100%"
              gap={8}
              justifyContent="center"
              alignItems="center"
            >
              {hasTokenAddress ? (
                <>
                  <Flex flexDir="column" alignItems="center">
                    <Text fontSize="28px" fontWeight="bold" mt={4}>
                      진행중
                    </Text>
                    <Flex justifyContent="center" gap={4} mt={4}>
                      <Box bgColor="teal" p={4} borderRadius="xl">
                        <Text fontWeight="bold" fontSize="20px">
                          01
                        </Text>
                      </Box>
                      <Box bgColor="teal" p={4} borderRadius="xl">
                        <Text fontWeight="bold" fontSize="20px">
                          32
                        </Text>
                      </Box>
                      <Box bgColor="teal" p={4} borderRadius="xl">
                        <Text fontWeight="bold" fontSize="20px">
                          43
                        </Text>
                      </Box>
                      <Box bgColor="teal" p={4} borderRadius="xl">
                        <Text fontWeight="bold" fontSize="20px">
                          21
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    mt={4}
                    w="100%"
                  >
                    <Progress
                      value={80}
                      colorScheme="teal"
                      w="75%"
                      borderRadius="md"
                    />
                    <Flex justifyContent="space-between" w="75%" mt={2}>
                      <Text fontSize="14px" color="white" fontWeight="bold">
                        0%
                      </Text>
                      <Text fontSize="14px" color="white" fontWeight="bold">
                        100%
                      </Text>
                    </Flex>
                  </Flex>
                </>
              ) : (
                <Flex flexDir="column" alignItems="center" gap={4}>
                  <Text fontSize="28px" fontWeight="bold">
                    시작전
                  </Text>
                  <Button
                    bgColor="teal"
                    _hover={{ bgColor: "teal.400" }}
                    onClick={onOpen}
                  >
                    <Text fontSize="28px" fontWeight="bold" color="white" p={4}>
                      프리세일 생성
                    </Text>
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex
            h="40vh"
            p={4}
            borderRadius="lg"
            bgColor="boxColor"
            boxShadow="lg"
            border="3px solid"
            borderColor="teal"
            flexDir="column"
            justifyContent="space-between"
          >
            <Flex flexDir="column">
              <Flex alignItems="center" justifyContent="space-between" mb={4}>
                <Text fontSize="24px" fontWeight="bold">
                  토큰 권한
                </Text>
                <ExternalRightArrowButton
                  href={`${window.location.origin}/permissions`}
                  size="md"
                />
              </Flex>
              <Divider borderColor="gray.600" />
            </Flex>

            <Flex
              w="full"
              bgColor="gray.800"
              border="2px"
              borderColor="teal"
              justifyContent="space-between"
              borderRadius="md"
              p={4}
            >
              <Flex alignItems="center" gap={2}>
                <Icon as={TbCircleX} color="red" boxSize="32px" />
                <Text fontSize="24px" fontWeight="bold" color="white">
                  Mint
                </Text>
              </Flex>
              <Text fontSize="24px" fontWeight="bold" color="white">
                권한 있음
              </Text>
            </Flex>
            <Flex
              w="full"
              bgColor="gray.800"
              border="2px"
              borderColor="teal"
              justifyContent="space-between"
              borderRadius="md"
              p={4}
            >
              <Flex alignItems="center" gap={2}>
                <Icon as={TbCircleX} color="red" boxSize="32px" />
                <Text fontSize="24px" fontWeight="bold" color="white">
                  Owner
                </Text>
              </Flex>
              <Text fontSize="24px" fontWeight="bold" color="white">
                권한 있음
              </Text>
            </Flex>
            <Flex
              w="full"
              bgColor="gray.800"
              border="2px"
              borderColor="teal"
              justifyContent="space-between"
              borderRadius="md"
              p={4}
            >
              <Flex alignItems="center" gap={2}>
                <Icon as={TbCircleCheck} color="green" boxSize="32px" />
                <Text fontSize="24px" fontWeight="bold" color="white">
                  Freeze
                </Text>
              </Flex>
              <Text fontSize="24px" fontWeight="bold" color="white">
                권한 없음
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <CreatePresaleModal isOpen={isOpen} onClose={onClose} token={token} />
    </>
  );
};

export default TokenDetail;
