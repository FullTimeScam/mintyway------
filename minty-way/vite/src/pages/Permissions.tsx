import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Divider,
} from "@chakra-ui/react";
import { TbCaretDownFilled } from "react-icons/tb";
import Search from "../components/Search";
import { truncateAddress } from "../utils/formatting";
import useToastNotification from "../hooks/useToastNotification";
import dummyData from "../data/dummyData.json";
import { CopyAddressButton, ExternalLinkButton } from "../utils/iconButtons";

const Permissions: React.FC = () => {
  const { showToast } = useToastNotification();

  const handleMintAction = (action: string, tokenName: string) => {
    console.log(`${action} mint for ${tokenName}`);
  };

  const handleFreezeAction = (action: string, tokenName: string) => {
    console.log(`${action} freeze for ${tokenName}`);
  };

  const handleOwnerAction = (action: string, tokenName: string) => {
    console.log(`${action} owner for ${tokenName}`);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    showToast(
      "주소 복사됨",
      "컨트랙트 주소가 클립보드에 복사되었습니다.",
      "success"
    );
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
            토큰 권한 관리
          </Text>
          <Search width="300px" placeholder="토큰 검색" />
        </Flex>
        <Divider mb={4} borderColor="gray.600" />
        <Box className="styled-scrollbar">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th w="25%" fontSize="md" fontWeight="bold" color="gray.400">
                  토큰 이름
                </Th>
                <Th w="35%" fontSize="md" fontWeight="bold" color="gray.400">
                  컨트랙트 주소
                </Th>
                <Th
                  w="40%"
                  textAlign="left"
                  fontSize="md"
                  fontWeight="bold"
                  color="gray.400"
                >
                  권한 변경
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {dummyData.map((data, index) => (
                <Tr key={index} _hover={{ bg: "hoverColor" }}>
                  <Td>
                    <Flex alignItems="center">
                      <Image
                        src={data.imageUrl}
                        alt={`${data.tokenName} 이미지`}
                        borderRadius="full"
                        boxSize="40px"
                        mr={3}
                        _hover={{
                          transform: "scale(1.05)",
                          transition: "transform 0.2s ease-in-out",
                        }}
                      />
                      <Text fontWeight="bold" color="white">
                        {data.tokenName}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap={1}>
                      <Text
                        mr={2}
                        wordBreak="break-all"
                        color="teal.300"
                        fontWeight="bold"
                      >
                        {truncateAddress(data.contractAddress)}
                      </Text>
                      <CopyAddressButton
                        address={data.contractAddress}
                        size="sm"
                        onCopy={handleCopyAddress}
                      />
                      <ExternalLinkButton href={data.link} size="sm" />
                    </Flex>
                  </Td>
                  <Td textAlign="left">
                    <Menu>
                      <MenuButton
                        as={Button}
                        size="sm"
                        colorScheme="teal"
                        variant="solid"
                        rightIcon={<TbCaretDownFilled />}
                        mr={2}
                        isDisabled={!data.permissions.mint}
                        _hover={{ bg: "teal.600" }}
                      >
                        Mint
                      </MenuButton>
                      <MenuList bgColor={"gray.700"} color="white">
                        <MenuItem
                          bgColor={"gray.700"}
                          _hover={{ bg: "teal.600" }}
                          onClick={() =>
                            handleMintAction("Give", data.tokenName)
                          }
                        >
                          Mint 권한 넘겨주기
                        </MenuItem>
                        <MenuItem
                          bgColor={"gray.700"}
                          _hover={{ bg: "teal.600" }}
                          onClick={() =>
                            handleMintAction("Revoke", data.tokenName)
                          }
                        >
                          Mint 권한 없애기
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    <Menu>
                      <MenuButton
                        as={Button}
                        size="sm"
                        colorScheme="teal"
                        variant="solid"
                        rightIcon={<TbCaretDownFilled />}
                        mr={2}
                        isDisabled={!data.permissions.freeze}
                        _hover={{ bg: "teal.600" }}
                      >
                        Freeze
                      </MenuButton>
                      <MenuList color="black">
                        <MenuItem
                          onClick={() =>
                            handleFreezeAction("Give", data.tokenName)
                          }
                        >
                          Freeze 권한 넘겨주기
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleFreezeAction("Revoke", data.tokenName)
                          }
                        >
                          Freeze 권한 없애기
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    <Menu>
                      <MenuButton
                        as={Button}
                        size="sm"
                        colorScheme="teal"
                        variant="solid"
                        rightIcon={<TbCaretDownFilled />}
                        isDisabled={!data.permissions.owner}
                        _hover={{ bg: "teal.600" }}
                      >
                        Owner
                      </MenuButton>
                      <MenuList color="black">
                        <MenuItem
                          onClick={() =>
                            handleOwnerAction("Give", data.tokenName)
                          }
                        >
                          Owner 권한 넘겨주기
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleOwnerAction("Revoke", data.tokenName)
                          }
                        >
                          Owner 권한 없애기
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
};

export default Permissions;
