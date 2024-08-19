import {
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC, useState, useEffect } from "react";
import templateData from "../data/templateData.json";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";

interface CreateTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateIndex: number;
}

const CreateTokenModal: FC<CreateTokenModalProps> = ({
  isOpen,
  onClose,
  templateIndex,
}) => {
  const [initialSupply, setInitialSupply] = useState<number | "">(0);
  const [totalSupply, setTotalSupply] = useState<number | "">(0);
  const { signer } = useOutletContext<OutletContext>();
  const [tokenOwner, setTokenOwner] = useState<string | undefined>(
    signer?.address
  );

  useEffect(() => {
    if (templateIndex === 0) {
      setTotalSupply(initialSupply);
    }
  }, [initialSupply, templateIndex]);

  useEffect(() => {
    handleClose();
  }, [signer]);

  const handleClose = () => {
    setInitialSupply(0);
    setTotalSupply(0);
    onClose();
    setTokenOwner(signer?.address);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor="boxColor"
        border="3px solid"
        borderColor="teal"
        borderRadius="xl"
      >
        <Flex flexDir="column">
          <ModalHeader fontSize="32px" color="white" textAlign="center">
            {templateData[templateIndex].template}
          </ModalHeader>
          <ModalCloseButton mt={4} mr={2} color="teal" fontSize="28px" />
        </Flex>

        <Divider mb={4} borderColor="gray.600" />
        <ModalBody>
          <Flex flexDir="column" gap={4}>
            <Flex justifyContent="center" gap={8}>
              <Flex flexDir="column" color="white" p={4} w="41%">
                <Flex h="40px" justifyContent="start" alignItems="center">
                  <Text fontWeight="bold" fontSize="20px">
                    토큰 이름
                  </Text>
                </Flex>
                <Input
                  fontSize="24px"
                  fontWeight="bold"
                  placeholder="토큰 이름"
                  h="50px"
                  _focus={{
                    bgColor: "gray.700",
                    borderColor: "teal",
                    boxShadow: "none",
                  }}
                />
              </Flex>
              <Flex flexDir="column" color="white" p={4} w="41%">
                <Flex
                  w="45%"
                  h="40px"
                  justifyContent="start"
                  alignItems="center"
                  borderRadius="md"
                >
                  <Text fontWeight="bold" fontSize="20px">
                    토큰 심볼
                  </Text>
                </Flex>
                <Input
                  fontSize="24px"
                  fontWeight="bold"
                  placeholder="토큰 심볼"
                  h="50px"
                  _focus={{
                    bgColor: "gray.700",
                    borderColor: "teal",
                    boxShadow: "none",
                  }}
                />
              </Flex>
            </Flex>
            <Flex justifyContent="center" gap={8}>
              <Flex flexDir="column" p={4} w="85%">
                <Flex flexDir="column" alignItems="start" mb={2} gap={1}>
                  <Text fontWeight="bold" fontSize="20px" color="white">
                    초기 토큰 발행량
                  </Text>
                  <Text fontWeight="bold" fontSize="16px" color="gray.400">
                    초기 토큰 발행량에 대한 설명
                  </Text>
                </Flex>
                <Input
                  fontSize="24px"
                  fontWeight="bold"
                  placeholder="토큰 초기 발행량"
                  h="50px"
                  color="white"
                  onChange={(e) => {
                    const value = Number(e.target.value) || "";
                    setInitialSupply(value);
                    if (templateIndex === 0) {
                      setTotalSupply(value);
                    }
                  }}
                  _focus={{
                    bgColor: "gray.700",
                    borderColor: "teal",
                    boxShadow: "none",
                  }}
                />
              </Flex>
            </Flex>
            <Flex justifyContent="center" gap={8}>
              <Flex flexDir="column" p={4} w="85%">
                <Flex flexDir="column" alignItems="start" mb={2} gap={1}>
                  <Text fontWeight="bold" fontSize="20px" color="white">
                    총 토큰 발행량
                  </Text>
                  <Text fontWeight="bold" fontSize="16px" color="gray.400">
                    총 토큰 발행량에 대한 설명
                  </Text>
                </Flex>
                <Input
                  fontSize="24px"
                  fontWeight="bold"
                  placeholder="총 토큰 발행량"
                  h="50px"
                  color="white"
                  value={totalSupply === 0 ? "" : totalSupply}
                  onChange={(e) => {
                    if (templateIndex !== 0) {
                      setTotalSupply(Number(e.target.value) || "");
                    }
                  }}
                  isDisabled={templateIndex === 0}
                  _focus={{
                    bgColor: "gray.700",
                    borderColor: "teal",
                    boxShadow: "none",
                  }}
                />
              </Flex>
            </Flex>
            <Flex justifyContent="center" gap={8}>
              <Flex flexDir="column" p={4} w="85%">
                <Flex flexDir="column" alignItems="start" mb={2} gap={1}>
                  <Text fontWeight="bold" fontSize="20px" color="white">
                    토큰 Owner
                  </Text>
                  <Text fontWeight="bold" fontSize="16px" color="gray.400">
                    토큰 Owner에 대한 설명
                  </Text>
                </Flex>
                <Input
                  fontSize="24px"
                  fontWeight="bold"
                  h="50px"
                  color="white"
                  value={tokenOwner}
                  placeholder="Owner 주소"
                  onChange={(e) => setTokenOwner(e.target.value)}
                  isDisabled={templateIndex === 0}
                  _focus={{
                    bgColor: "gray.700",
                    borderColor: "teal",
                    boxShadow: "none",
                  }}
                />
              </Flex>
            </Flex>
            {templateIndex !== 0 && (
              <Flex justifyContent="center" gap={8}>
                <Flex p={4} w="85%">
                  <Flex
                    flexDir="column"
                    alignItems="start"
                    mb={2}
                    gap={1}
                    w="55%"
                  >
                    <Text fontWeight="bold" fontSize="20px" color="white">
                      Mintable
                    </Text>
                    <Text fontWeight="bold" fontSize="16px" color="gray.400">
                      Mintable에 대한 설명
                    </Text>
                  </Flex>
                  <Flex
                    flexDir="column"
                    alignItems="start"
                    mb={2}
                    gap={1}
                    w="40%"
                  >
                    <Text fontWeight="bold" fontSize="20px" color="white">
                      Burnable
                    </Text>
                    <Text fontWeight="bold" fontSize="16px" color="gray.400">
                      Burnable에 대한 설명
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Flex>

          <Flex my={4} justifyContent="center">
            <Button bgColor="teal" _hover={{ bgColor: "teal.400" }} w="82%">
              <Text color="white" fontSize="20px" fontWeight="bold">
                토큰 생성
              </Text>
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateTokenModal;
