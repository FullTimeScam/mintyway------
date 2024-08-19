import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  Progress,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ExternalDiscordButton,
  ExternalGithubButton,
  ExternalTelegramButton,
  ExternalWebsiterButton,
  ExternalWhitepaperButton,
  ExternalXButton,
} from "../utils/iconButtons";
import { formatDateInKorean } from "../utils/formatDateInKorean";

const PresaleDetail: FC = () => {
  const location = useLocation();
  const presale = location.state;
  const [step, setStep] = useState<number>(0);

  const steps = [
    {
      title: "구독",
      date: formatDateInKorean(presale.subscriptionStartTime),
    },
    {
      title: "스냅샷",
      date: formatDateInKorean(presale.snapshotStartTime),
    },
    {
      title: "추첨",
      date: formatDateInKorean(presale.lotteryStartTime),
    },
    {
      title: "토큰 분배",
      date: formatDateInKorean(presale.redemptionTime),
    },
  ];

  const { activeStep } = useSteps({
    index: step,
    count: steps.length,
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentPhase, setCurrentPhase] = useState("subscription"); // 현재 단계 (구독, 스냅샷, 추첨)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      const subscriptionStartTime = new Date(presale.subscriptionStartTime);
      const snapshotEndTime = new Date(presale.snapshotEndTime);
      const lotteryStartTime = new Date(presale.lotteryStartTime);
      const lotteryEndTime = new Date(presale.lotteryEndTime);
      const redemptionTime = new Date(presale.redemptionTime);

      let targetDate;

      if (now < subscriptionStartTime) {
        targetDate = subscriptionStartTime;
        setCurrentPhase("subscription");
      } else if (now >= subscriptionStartTime && now < snapshotEndTime) {
        targetDate = snapshotEndTime;
        setCurrentPhase("snapshot");
        setStep(1);
      } else if (now >= snapshotEndTime && now < lotteryStartTime) {
        targetDate = lotteryStartTime;
        setCurrentPhase("lottery");
        setStep(2);
      } else if (now >= lotteryStartTime && now < lotteryEndTime) {
        targetDate = lotteryEndTime;
        setCurrentPhase("lotteryIng");
      } else if (now >= lotteryEndTime && now < redemptionTime) {
        targetDate = redemptionTime;
        setCurrentPhase("redemption");
        setStep(3);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [
    presale.subscriptionStartTime,
    presale.snapshotEndTime,
    presale.lotteryStartTime,
    presale.lotteryEndTime,
    presale.redemptionTime,
  ]);

  const getPhaseText = () => {
    switch (currentPhase) {
      case "subscription":
        return "구독 시작 전";
      case "snapshot":
        return "마지막 스냅샷";
      case "lottery":
        return "추첨 시작 전";
      case "lotteryIng":
        return "추첨 진행중";
      case "redemption":
        return "토큰 분배 전";
      default:
        setStep(4);
        return "프리세일이 종료되었습니다.";
    }
  };

  return (
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
        <Flex flexDir="column" justifyContent="center" alignItems="center">
          <Stepper
            size="lg"
            colorScheme="teal"
            index={activeStep}
            w="full"
            p={4}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>
                    <Text fontWeight="bold" color="white">
                      {step.title}
                    </Text>
                  </StepTitle>
                  <StepDescription>
                    <Text fontWeight="bold" color="white" fontSize="12px">
                      {step.date}
                    </Text>
                  </StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          <Divider mb={4} borderColor="gray.600" />
        </Flex>
        <Flex
          flexDir="column"
          h="100%"
          alignItems="center"
          justifyContent="center"
          gap={4}
          p={8}
          className="styled-scrollbar"
        >
          <Flex flexDir="column" gap={4}>
            <Image
              src={presale.image}
              alt={presale.name}
              w="500px"
              h="auto"
              objectFit="contain"
              rounded="lg"
              mt={20}
            />
          </Flex>
          <Flex
            flexDir="column"
            justifyContent="space-between"
            w="full"
            gap={8}
          >
            <Flex justifyContent="space-between" mt={4}>
              <Text fontWeight="bold" fontSize="24px">
                {presale.name}
              </Text>
              <Flex gap={2}>
                <ExternalGithubButton href="https://github.com" size="sm" />
                <ExternalXButton href="https://x.com/" size="sm" />
                <ExternalTelegramButton
                  href="https://web.telegram.org/"
                  size="sm"
                />
                <ExternalDiscordButton href="https://discord.com/" size="sm" />
                <ExternalWhitepaperButton href="https://google.com" size="sm" />
                <ExternalWebsiterButton href="https://google.com/" size="sm" />
              </Flex>
            </Flex>
            <Text w="full" fontWeight="bold" fontSize="20px">
              {presale.description}
            </Text>
          </Flex>
          <Divider my={4} borderColor="gray.600" />
          <Grid
            w="full"
            templateColumns="repeat(3, 1fr)"
            gap={4}
            justifyContent="center"
            alignItems="center"
            h="40vh"
            mt={4}
          >
            <GridItem
              h="full"
              border="3px solid"
              borderColor="gray.600"
              borderRadius="lg"
            >
              <Text fontWeight="bold" fontSize="18px" p={2}>
                블록체인 네트워크
              </Text>
              <Divider borderColor="gray.600" />
              <Text fontWeight="bold" fontSize="24px" textAlign="center" p={4}>
                {presale.projectInfo.network}
              </Text>
            </GridItem>
            <GridItem
              h="full"
              border="3px solid"
              borderColor="gray.600"
              borderRadius="lg"
            >
              <Text fontWeight="bold" fontSize="18px" p={2}>
                총 발행량
              </Text>
              <Divider borderColor="gray.600" />
              <Text fontWeight="bold" fontSize="24px" textAlign="center" p={4}>
                {Number(presale.projectInfo.totalSupply).toLocaleString()}
              </Text>
            </GridItem>
            <GridItem
              h="full"
              border="3px solid"
              borderColor="gray.600"
              borderRadius="lg"
            >
              <Text fontWeight="bold" fontSize="18px" p={2}>
                하드 캡
              </Text>
              <Divider borderColor="gray.600" />
              <Text fontWeight="bold" fontSize="24px" textAlign="center" p={4}>
                ${Number(presale.projectInfo.hardCap).toLocaleString()}
              </Text>
            </GridItem>
            <GridItem
              h="full"
              border="3px solid"
              borderColor="gray.600"
              borderRadius="lg"
            >
              <Text fontWeight="bold" fontSize="18px" p={2}>
                플랫폼 모집 금액
              </Text>
              <Divider borderColor="gray.600" />
              <Text fontWeight="bold" fontSize="24px" textAlign="center" p={4}>
                ${Number(presale.projectInfo.platformRaise).toLocaleString()}
              </Text>
            </GridItem>
            <GridItem
              h="full"
              border="3px solid"
              borderColor="gray.600"
              borderRadius="lg"
            >
              <Text fontWeight="bold" fontSize="18px" p={2}>
                프로젝트 평가액
              </Text>
              <Divider borderColor="gray.600" />
              <Text fontWeight="bold" fontSize="24px" textAlign="center" p={4}>
                ${Number(presale.projectInfo.projectValuation).toLocaleString()}
              </Text>
            </GridItem>
            <GridItem
              h="full"
              border="3px solid"
              borderColor="gray.600"
              borderRadius="lg"
            >
              <Text fontWeight="bold" fontSize="18px" p={2}>
                초기 시가총액
              </Text>
              <Divider borderColor="gray.600" />
              <Text fontWeight="bold" fontSize="24px" textAlign="center" p={4}>
                ${Number(presale.projectInfo.initialMarketCap).toLocaleString()}
              </Text>
            </GridItem>
          </Grid>
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
          </Flex>
          <Divider borderColor="gray.600" />
          <Flex
            flexDir="column"
            h="100%"
            gap={8}
            justifyContent="center"
            alignItems="center"
          >
            <Flex flexDir="column" alignItems="center">
              <Text fontSize="28px" fontWeight="bold" mt={4}>
                {getPhaseText()}
              </Text>
              <Flex justifyContent="center" gap={4} mt={4}>
                <Box bgColor="teal" p={4} borderRadius="xl" w={16} h={16}>
                  <Text fontWeight="bold" fontSize="24px" textAlign="center">
                    {timeLeft.days}
                  </Text>
                </Box>
                <Box bgColor="teal" p={4} borderRadius="xl" w={16} h={16}>
                  <Text fontWeight="bold" fontSize="24px" textAlign="center">
                    {timeLeft.hours}
                  </Text>
                </Box>
                <Box bgColor="teal" p={4} borderRadius="xl" w={16} h={16}>
                  <Text fontWeight="bold" fontSize="24px" textAlign="center">
                    {timeLeft.minutes}
                  </Text>
                </Box>
                <Box bgColor="teal" p={4} borderRadius="xl" w={16} h={16}>
                  <Text fontWeight="bold" fontSize="24px" textAlign="center">
                    {timeLeft.seconds}
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
            <Flex>
              <InputGroup w={60}>
                <Input
                  placeholder="티켓 수"
                  variant="filled"
                  bgColor="gray.700"
                  _hover={{ bgColor: "gray.600" }}
                  _placeholder={{ color: "gray.400" }}
                  _focus={{ bgColor: "gray.600", borderColor: "teal" }}
                  color="white"
                />
              </InputGroup>
              <Button colorScheme="teal">구매</Button>
            </Flex>
          </Flex>
        </Flex>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={8}
          justifyContent="center"
          alignItems="center"
          h="40vh"
        >
          <GridItem
            h="full"
            border="3px solid"
            borderColor="teal"
            borderRadius="lg"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold" fontSize="18px" p={2}>
                출시 가격
              </Text>
              <Text fontWeight="bold" fontSize="18px" color="gray.500" p={2}>
                USDC
              </Text>
            </Flex>
            <Divider mb={4} borderColor="gray.600" />
            <Text fontWeight="bold" fontSize="24px" textAlign="center">
              {Number(presale.ticketInfo.launchPrice).toLocaleString()}
            </Text>
          </GridItem>
          <GridItem
            h="full"
            border="3px solid"
            borderColor="teal"
            borderRadius="lg"
          >
            <Text fontWeight="bold" fontSize="18px" p={2}>
              총 모금액
            </Text>
            <Divider mb={4} borderColor="gray.600" />
            <Text fontWeight="bold" fontSize="24px" textAlign="center">
              {Number(presale.ticketInfo.totalAmount).toLocaleString()}
            </Text>
          </GridItem>
          <GridItem
            h="full"
            border="3px solid"
            borderColor="teal"
            borderRadius="lg"
          >
            <Text fontWeight="bold" fontSize="18px" p={2}>
              총 발행량
            </Text>
            <Divider mb={4} borderColor="gray.600" />
            <Text fontWeight="bold" fontSize="24px" textAlign="center">
              {Number(presale.ticketInfo.totalIssued).toLocaleString()}
            </Text>
          </GridItem>
          <GridItem
            h="full"
            border="3px solid"
            borderColor="teal"
            borderRadius="lg"
          >
            <Text fontWeight="bold" fontSize="18px" p={2}>
              총 당첨 티켓 수
            </Text>
            <Divider mb={4} borderColor="gray.600" />
            <Text fontWeight="bold" fontSize="24px" textAlign="center">
              {Number(presale.ticketInfo.totalWinningTickets).toLocaleString()}
            </Text>
          </GridItem>
          <GridItem
            h="full"
            border="3px solid"
            borderColor="teal"
            borderRadius="lg"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold" fontSize="16px" p={2}>
                티켓 당 교환 금액
              </Text>
              <Text fontWeight="bold" fontSize="18px" color="gray.500" p={2}>
                USDC
              </Text>
            </Flex>
            <Divider mb={4} borderColor="gray.600" />
            <Text fontWeight="bold" fontSize="24px" textAlign="center">
              {Number(presale.ticketInfo.redemptionAmount).toLocaleString()}{" "}
            </Text>
          </GridItem>
          <GridItem
            h="full"
            border="3px solid"
            borderColor="teal"
            borderRadius="lg"
          >
            <Text fontWeight="bold" fontSize="18px" p={2}>
              총 참가자 수
            </Text>
            <Divider mb={4} borderColor="gray.600" />
            <Text fontWeight="bold" fontSize="24px" textAlign="center">
              {presale.ticketInfo.totalParticipants}
            </Text>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default PresaleDetail;
