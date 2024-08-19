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
  Textarea,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerInput from "./DatePickerInput";
import { OutletContext } from "./Layout";
import { useOutletContext } from "react-router-dom";

interface CreatePresaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: IMyToken;
}

const CreatePresaleModal: FC<CreatePresaleModalProps> = ({
  isOpen,
  onClose,
  token,
}) => {
  const { presaleList, setPresaleList } = useOutletContext<OutletContext>();
  const [subscriptionStartTime, setSubscriptionStartTime] = useState<string>(
    new Date().toDateString()
  );
  const [snapshotStartTime, setSnapshotStartTime] = useState<string>(
    new Date().toDateString()
  );
  const [snapshotEndTime, setSnapshotEndTime] = useState<string>(
    new Date().toDateString()
  );
  const [lotteryStartTime, setLotteryStartTime] = useState<string>(
    new Date().toDateString()
  );
  const [lotteryEndTime, setLotteryEndTime] = useState<string>(
    new Date().toDateString()
  );
  const [redemptionTime, setRedemptionTime] = useState<string>(
    new Date().toDateString()
  );

  const [subscriptionStartTimePickerOpen, setSubscriptionStartTimePickerOpen] =
    useState<boolean>(false);
  const [snapshotStartTimePickerOpen, setSnapshotStartTimePickerOpen] =
    useState<boolean>(false);
  const [snapshotEndTimePickerOpen, setSnapshotEndTimePickerOpen] =
    useState<boolean>(false);
  const [lotteryStartTimePickerOpen, setLotteryStartTimePickerOpen] =
    useState<boolean>(false);
  const [lotteryEndTimePickerOpen, setLotteryEndTimePickerOpen] =
    useState<boolean>(false);
  const [redemptionTimePickerOpen, setRedemptionTimePickerOpen] =
    useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [hardCap, setHardCap] = useState<number>(0);
  const [platformRaise, setPlatformRaise] = useState<number>(0);
  const [projectValuation, setProjectValuation] = useState<number>(0);
  const [initialMarketCap, setInitialMarketCap] = useState<number>(0);

  const [launchPrice, setLaunchPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalIssued, setTotalIssued] = useState<number>(0);
  const [totalWinningTickets, setTotalWinningTickets] = useState<number>(0);
  const [redemptionAmount, setRedemptionAmount] = useState<number>(0);
  const [totalParticipants, setTotalParticipants] = useState<number>(0);

  const handleSubscriptionStartTimeClick = () => {
    setSubscriptionStartTimePickerOpen(true);
  };

  const handleSubscriptionStartTimeChange = (date: string) => {
    setSubscriptionStartTime(date);
    setSnapshotStartTime(date);
    setSubscriptionStartTimePickerOpen(false);
  };

  const handleSnapshotStartTimeClick = () => {
    setSnapshotStartTimePickerOpen(true);
  };

  const handleSnapshotStartTimeChange = (date: string) => {
    setSnapshotStartTime(date);
    setSnapshotEndTime(date);
    setSnapshotStartTimePickerOpen(false);
  };

  const handleSnapshotEndTimeClick = () => {
    setSnapshotEndTimePickerOpen(true);
  };

  const handleSnapshotEndTimeChange = (date: string) => {
    setSnapshotEndTime(date);
    setLotteryStartTime(date);
    setSnapshotEndTimePickerOpen(false);
  };

  const handleLotteryStartTimeClick = () => {
    setLotteryStartTimePickerOpen(true);
  };

  const handleLotteryStartTimeChange = (date: string) => {
    setLotteryStartTime(date);
    setLotteryEndTime(date);
    setLotteryStartTimePickerOpen(false);
  };

  const handleLotteryEndTimeClick = () => {
    setLotteryEndTimePickerOpen(true);
  };

  const handleLotteryEndTimeChange = (date: string) => {
    setLotteryEndTime(date);
    setRedemptionTime(date);
    setLotteryEndTimePickerOpen(false);
  };

  const handleRedemptionTimeClick = () => {
    setRedemptionTimePickerOpen(true);
  };

  const handleRedemptionTimeChange = (date: string) => {
    setRedemptionTime(date);
    setRedemptionTimePickerOpen(false);
  };

  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null | undefined
  >();
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setSelectedImage(imageUrl);
        setSelectedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const onClickCreatePresale = () => {
    const newPresale: IPresale = {
      tokenAddress: token.token_address,
      name: token.name,
      description,
      image: selectedImage,
      subscriptionStartTime,
      snapshotStartTime,
      snapshotEndTime,
      lotteryStartTime,
      lotteryEndTime,
      redemptionTime,
      projectInfo: {
        network: "Ethereum",
        totalSupply: token.total_supply,
        hardCap,
        platformRaise,
        projectValuation,
        initialMarketCap,
      },
      ticketInfo: {
        launchPrice,
        totalAmount,
        totalIssued,
        totalWinningTickets,
        redemptionAmount,
        totalParticipants,
      },
    };
    setPresaleList([...presaleList, newPresale]);
    onClose();
  };

  useEffect(() => console.log(presaleList), [presaleList]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor="boxColor"
        border="3px solid"
        borderColor="teal"
        borderRadius="xl"
        className="styled-scrollbar"
        maxHeight="900px"
      >
        <ModalBody>
          <Flex flexDir="column">
            <ModalHeader fontSize="32px" color="white" textAlign="center">
              프리세일 생성
            </ModalHeader>
            <ModalCloseButton mt={4} mr={2} color="teal" fontSize="28px" />
          </Flex>
          <Divider mb={4} borderColor="gray.600" />
          <Flex justifyContent="center" gap={2}>
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
                value={token.name}
                isDisabled={true}
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
                value={token.symbol}
                isDisabled={true}
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
                  토큰 이미지
                </Text>
              </Flex>
              <Button
                as="label"
                htmlFor="file-upload"
                bgColor="backgroundColor"
                color="white"
                p={4}
                borderRadius="md"
                textAlign="center"
                h="50px"
                border="2px solid"
                borderColor="gray.300"
                _hover={{ bgColor: "gray.600" }}
              >
                <Text fontSize="20px" fontWeight="bold">
                  {selectedFileName || "파일 선택"}
                </Text>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  display="none"
                />
              </Button>
            </Flex>
          </Flex>
          <Flex justifyContent="center" gap={2}>
            <Flex flexDir="column" color="white" p={4} w="full">
              <Flex h="40px" justifyContent="start" alignItems="center">
                <Text fontWeight="bold" fontSize="20px">
                  프리세일 설명
                </Text>
              </Flex>
              <Textarea
                fontWeight="bold"
                fontSize="20px"
                placeholder="프로젝트에 대한 설명을 적어주세요."
                onChange={(e) => setDescription(e.target.value)}
                _focus={{
                  border: "2px solid",
                  borderColor: "teal",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </Flex>
          </Flex>
          <Flex justifyContent="center" gap={0}>
            <DatePickerInput
              label="구독 시작 시간"
              selectedDate={subscriptionStartTime}
              onChange={handleSubscriptionStartTimeChange}
              pickerOpen={subscriptionStartTimePickerOpen}
              onClickPicker={handleSubscriptionStartTimeClick}
              onClosePicker={() => setSubscriptionStartTimePickerOpen(false)}
              minDate={new Date()}
              minTime={new Date()}
            />
            <DatePickerInput
              label="스냅샷 시작 시간"
              selectedDate={snapshotStartTime}
              onChange={handleSnapshotStartTimeChange}
              pickerOpen={snapshotStartTimePickerOpen}
              onClickPicker={handleSnapshotStartTimeClick}
              onClosePicker={() => setSnapshotStartTimePickerOpen(false)}
              minDate={new Date(subscriptionStartTime)}
              minTime={new Date(subscriptionStartTime)}
            />
            <DatePickerInput
              label="스냅샷 종료 시간"
              selectedDate={snapshotEndTime}
              onChange={handleSnapshotEndTimeChange}
              pickerOpen={snapshotEndTimePickerOpen}
              onClickPicker={handleSnapshotEndTimeClick}
              onClosePicker={() => setSnapshotEndTimePickerOpen(false)}
              minDate={new Date(snapshotStartTime)}
              minTime={new Date(snapshotStartTime)}
            />
          </Flex>
          <Flex justifyContent="center" gap={2}>
            <DatePickerInput
              label="추첨 시작 시간"
              selectedDate={lotteryStartTime}
              onChange={handleLotteryStartTimeChange}
              pickerOpen={lotteryStartTimePickerOpen}
              onClickPicker={handleLotteryStartTimeClick}
              onClosePicker={() => setLotteryStartTimePickerOpen(false)}
              minDate={new Date(snapshotEndTime)}
              minTime={new Date(snapshotEndTime)}
            />
            <DatePickerInput
              label="추첨 종료 시간"
              selectedDate={lotteryEndTime}
              onChange={handleLotteryEndTimeChange}
              pickerOpen={lotteryEndTimePickerOpen}
              onClickPicker={handleLotteryEndTimeClick}
              onClosePicker={() => setLotteryEndTimePickerOpen(false)}
              minDate={new Date(lotteryStartTime)}
              minTime={new Date(lotteryStartTime)}
            />
            <DatePickerInput
              label="토큰 분배 시간"
              selectedDate={redemptionTime}
              onChange={handleRedemptionTimeChange}
              pickerOpen={redemptionTimePickerOpen}
              onClickPicker={handleRedemptionTimeClick}
              onClosePicker={() => setRedemptionTimePickerOpen(false)}
              minDate={new Date(lotteryEndTime)}
              minTime={new Date(lotteryEndTime)}
            />
          </Flex>
          <Flex justifyContent="center" gap={2}>
            <Flex flexDir="column" color="white" p={4} w="41%">
              <Flex h="40px" justifyContent="start" alignItems="center">
                <Text fontWeight="bold" fontSize="20px">
                  블록체인 네트워크
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="블록체인 네트워크"
                value="Ethereum"
                isDisabled={true}
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
                  총 발행량
                </Text>
              </Flex>
              <Input
                fontSize="20px"
                fontWeight="bold"
                placeholder="총 발행량"
                value={Number(token.total_supply).toLocaleString()}
                isDisabled={true}
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
                  하드캡
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="하드캡"
                onChange={(e) => setHardCap(Number(e.target.value))}
                h="50px"
                _focus={{
                  bgColor: "gray.700",
                  borderColor: "teal",
                  boxShadow: "none",
                }}
              />
            </Flex>
          </Flex>
          <Flex justifyContent="center" gap={2}>
            <Flex flexDir="column" color="white" p={4} w="41%">
              <Flex h="40px" justifyContent="start" alignItems="center">
                <Text fontWeight="bold" fontSize="20px">
                  플랫폼 모집 금액
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="플랫폼 모집 금액"
                onChange={(e) => setPlatformRaise(Number(e.target.value))}
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
                  프로젝트 평가액
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="프로젝트 평가액"
                onChange={(e) => setProjectValuation(Number(e.target.value))}
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
                  초기 시가총액
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="초기 시가총액"
                onChange={(e) => setInitialMarketCap(Number(e.target.value))}
                h="50px"
                _focus={{
                  bgColor: "gray.700",
                  borderColor: "teal",
                  boxShadow: "none",
                }}
              />
            </Flex>
          </Flex>
          <Flex justifyContent="center" gap={2}>
            <Flex flexDir="column" color="white" p={4} w="41%">
              <Flex h="40px" justifyContent="start" alignItems="center">
                <Text fontWeight="bold" fontSize="20px">
                  출시 가격
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="출시 가격"
                onChange={(e) => setLaunchPrice(Number(e.target.value))}
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
                  총 모금액
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="총 모금액"
                onChange={(e) => setTotalAmount(Number(e.target.value))}
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
                  발행량
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="발행량"
                onChange={(e) => setTotalIssued(Number(e.target.value))}
                h="50px"
                _focus={{
                  bgColor: "gray.700",
                  borderColor: "teal",
                  boxShadow: "none",
                }}
              />
            </Flex>
          </Flex>
          <Flex justifyContent="center" gap={2}>
            <Flex flexDir="column" color="white" p={4} w="41%">
              <Flex h="40px" justifyContent="start" alignItems="center">
                <Text fontWeight="bold" fontSize="20px">
                  총 당첨 티켓 수
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="총 당첨 티켓 수"
                onChange={(e) => setTotalWinningTickets(Number(e.target.value))}
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
                  티켓 당 교환 금액
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="티켓 당 교환 금액"
                onChange={(e) => setRedemptionAmount(Number(e.target.value))}
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
                  총 참가자 수
                </Text>
              </Flex>
              <Input
                fontSize="24px"
                fontWeight="bold"
                placeholder="총 참가자 수"
                value={totalParticipants}
                isDisabled={true}
                h="50px"
                _focus={{
                  bgColor: "gray.700",
                  borderColor: "teal",
                  boxShadow: "none",
                }}
              />
            </Flex>
          </Flex>
        </ModalBody>
        <Flex my={4} justifyContent="center">
          <Button
            bgColor="teal"
            _hover={{ bgColor: "teal.400" }}
            w="93%"
            onClick={onClickCreatePresale}
          >
            <Text color="white" fontSize="20px" fontWeight="bold">
              프리세일 생성
            </Text>
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default CreatePresaleModal;
