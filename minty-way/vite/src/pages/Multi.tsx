import { Box, Button, Flex, Image, Select, Text, Textarea } from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { TbFileUpload, TbSend } from "react-icons/tb";
import { Tooltip } from '@chakra-ui/react';
import multisenderExcel from "../../public/multiExcel.png";
import multisenderTxt from "../../public/multiTxt.png";

const Multi: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null); // ref 생성
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Textarea를 참조할 ref
  const [excelValue, setExcelValue] = useState<any>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isTextareaDisable, setIsTextareaDisable] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState<number>(0); // 키값을 관리할 상태 : 동일한 excel파일 선택했을때 브라우저가 변경으로 인식하지 않아서 onChange이벤트 발생 X
  //react key속성을 사용해서 <input type="file">로 input요소를 강제로 다시 렌더링 하면 동일 파일 선택했을 때도 onChange이벤트 발생

  // const theme = useTheme();

  const inputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const checkFormat = () => {
    var input = inputValue.trim().replace(/\r\n|\r|\n/g, "\n"); // 모든 줄바꿈 문자를 통일된 '\n'으로 변경
    input = input.replace(/,\s+/g, ","); // ,뒤에 \s는 공백 문자를 의미. +는 앞의 패턴이 1회 이상 반복됨을 의미 -> 공백 있으면 그냥 ,로 replace
    
    const lines = input.split("\n");
    const lineFormat = /^0x[a-fA-F0-9]{40},\d+(\.\d+)?$/i; // 각 줄을 검사할 정규식
    
    var isValid = true;

    for(let i=0; i < lines.length; i++) {
        const line = lines[i];
        if(!lineFormat.test(line)) {
            isValid = false;
            alert(`전송 불가능: ${i + 1}번째 줄에 문제가 있습니다. \n내용: "${line}"`);
        }
    }

    //const isValid =/^0x[a-fA-F0-9]{40},\d+(\.\d+)?(\r?\n0x[a-fA-F0-9]{40},\d+(\.\d+)?)*$/i.test(input);
    // ^ : 문자열 시작
    // 0x : 0x로 시작
    // [a-fA-F0-9] : []문자 클래스 안에 소문자 a~f, 대문자 A~F, 숫자 0~9
    // {40} 바로 앞 패턴이 40개 옴 : 주소는 1바이트는 16진수 2개 20 바이트는 16진수 40개 지갑주소 40자리 보장
    // , : 지갑주소 뒤에는 , 가 와야함
    // \d+ : 숫자 0~9 일치하는 패턴
    // (\.\d+)? : () 는 그룹화, \.은 문자로서 소수점, \d+은 소수점 뒤에 하나 이상의 숫자, ?는 소수점 부분이 선택적
    // (\r?\n0x[a-fA-F0-9]{40},\d+(\.\d+)?)*: 줄바꿈 문자가 올 수 있고 또 다른 주소랑 수량 패턴이 반복될 수 있음 \r?\n는 Windows (\r\n) 및 Unix (\n) 스타일의 줄바꿈을 처리
    // $: 문자열의 끝 의미 /i: 대소문자를 구분하지 않음.

    // , 이후에 수량입력할 때 빈칸 있어도 되게끔 수정하기 trim 사용해보자

    if (!isValid) {
      setIsError(true);
      alert("전송 불가능");
    } else {
      setIsError(false);
      alert("전송 가능");
    }
  };

  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.click(); // input의 click() 메서드를 호출
    }
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader(); // 브라우저 내에서 파일을 읽을 수 있도록 해주는 객체 웹API 일부
      //fileReader는 readAsArrayBuffer, readAsText, readAsDataURL 메서드에 따라 result형식 달라짐
    try {
        if (!e.currentTarget.files) return;
        const formData = new FormData();
        formData.append("file", e.currentTarget.files[0]); //formData객체에서 특정이름으로 필드값을 가져올때 const uploadedFile = formData.get("file"); 이럴때 저 append한 이름을 사용함
        console.log(formData)
        console.log(Array.from(formData.entries())); //파일명은 이걸로 확인하기
            
        const file = e.currentTarget.files[0];
        console.log(file);
        const fileType = file.type;
        const validExcelTypes = [
            "application/vnd.ms-excel", // .xls
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
            "text/csv", // csv
            "text/plain" //txt
        ];

        if (!validExcelTypes.includes(fileType)) {
            alert("엑셀 파일이 아닙니다");
            return;
        }
        reader.readAsArrayBuffer(file); //fileReader의 onload 이벤트 트리거
    } catch (error) {
      console.error(error);
    }
    
    //onload는 파일 읽기가 완료되었을 때 호출할 코드 정의
    reader.onload = (event) => {
    //event.target이 null이 아닌지, event.target.result가 undefined가 아닌지
        
        if(event.target?.result) {
            const arrayBuffer = event.target.result;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetNames = workbook.SheetNames; //시트 전체 이름 호출
            const sheetName = sheetNames[0]; //첫번째 시트 이름
            const sheet = workbook.Sheets[sheetName]; //시트들 중에 첫번째 시트 선택


            //참조할 값이 있는지 확인, 참조할 값 없다면 빈 엑셀임
            if(sheet["!ref"]) {
                const sheetRange = XLSX.utils.decode_range(sheet["!ref"]);
                //sheetRange.start.row
                let excelData = '';
                for (let row = sheetRange.s.r; row <= sheetRange.e.r ; row++) {
                    const cellA = sheet[XLSX.utils.encode_cell({r:row, c:0})];
                    const cellB = sheet[XLSX.utils.encode_cell({r:row, c:1})];
                
                    console.log(cellA);
                    console.log(cellB);

                    if (cellA && cellB) {
                        const concatAddressAmount = `${cellA.w},${Number(cellB.v)}`;
                        excelData += concatAddressAmount + '\n'; // 주소, 수량 엔터 역할 줄바꿈
                    } else {
                        alert(`엑셀의 ${row+1}행에 있는 지갑 주소 ${cellA.v} 혹은 보내는 수량을 확인해 주세요.`)
                    }
                    setExcelValue(excelData.trim());
                    setInputValue(excelData.trim());
                    if (textareaRef.current) {
                        textareaRef.current.value = excelData.trim(); // Textarea에 값 설정
                        setIsTextareaDisable(true);
                    }
                }
            } else {
                alert("빈엑셀 입니다");//출력확인
            }
    // console.log(arrayBuffer); arrayBuffer(9076) 파일크기가 9076바이트 length 9076 //파일 안에 있는 모든 데이터 포함
    // console.log(eventTarget.onload);Uint8Array(9076) [80, 75, 3, 4, 20, 0, 6, 0, 8, 0, 0, 0, 33, 0, 98, 238, 157, 104, 94, 1 ... 어레이 형식으로 출력
    // console.log(workbook)  시트네임, sheets/sheet1/A1: type: 's' v : 지갑주소/B1: type : 'n' v : 보내는 양
    // console.log(workbook.Sheets.Sheet1.A1); Sheet명이 Sheet1의 A1 데이터 반환
    // console.log(workbook.Sheets.Sheet1["!ref"]); Sheet명이 Sheet1의 A1 데이터 반환
    // console.log(workbook.Sheets.Sheet1.A1.v); Sheet명이 Sheet1의 A1 데이터 반환
    // const cell = workbook.Sheets.Sheet1.A1.v
    // setExcelValue(cell);
        setInputKey(inputKey + 1);
        }
    };
  };

    useEffect(() => {console.log(inputKey)}, [inputKey]);
    useEffect(() => {console.log(inputValue)}, [inputValue]);
    useEffect(() => {
        if(isError) {
            setExcelValue("");
            setIsTextareaDisable(false);
        }
        },[isError]);
    
    return (
        <Flex flexDir="column" w="100%" minH="100vh" alignItems="center" bgColor="gray.800" pt="20">
            <Text fontSize="5xl" fontWeight="bold" pt="4" pb="4" color="white">토큰 다중 전송</Text>
            <Flex flexDir="column" borderWidth="2px" borderColor="gray.100" minW="4xl" minH="2xl" mx="auto" p="5" borderRadius="lg" boxShadow="lg" bgColor="gray.700">
                <Flex>
                    <Flex flexDir="column" width="100%">
                        <Box fontWeight="bold" fontSize="2xl" color="white">토큰 선택</Box>
                        <Select pt="4" variant="ghost" borderColor="brand.500" borderWidth="2px" cursor="pointer" >
                            <option value='option1'>Ethereum</option>
                        </Select>
                    </Flex>
                </Flex>
                <Flex flexDir="column" pt="4">
                    <Flex alignItems="center" justifyContent="space-between">
                        <Text pb="4" fontWeight="bold" fontSize="2xl" color="white">주소 수량 입력</Text>
                    </Flex>
                        <Textarea
                        ref={textareaRef} // Textarea에 ref 할당
                        disabled={isTextareaDisable}
                        color="white"
                        bgColor="gray.600"  
                        fontSize="xl" 
                        h="md" 
                        resize="none" 
                        onChange={inputChange}
                        borderColor="teal.500"
                        borderWidth="2px"
                        placeholder="주소 입력, 보내는 수량 입력 (예: 0x123...c4d4,100)" />
                    <Flex mt="5">
                        <input key={inputKey} id="file2" type="file" onChange={onChangeFile} style={{ display: "none"}} ref={inputRef}/>
                        <Button onClick={() => onClickInput() } color="white" bgColor="teal" borderWidth="2px" borderColor="teal.500" alignItems="center" _hover={{ bgColor: "teal.400" }}><Text mr="1" color="white" >excel/csv/txt</Text><TbFileUpload size="25"/></Button>
                        <Tooltip
                         label={<Box><Image width="300px" h="100px" src={multisenderExcel}/><Text fontSize={21}>A 열 : 지갑주소, B 열 : 보내는 수량</Text></Box>} 
                         width={600}
                         placement="top"
                         aria-label='A tooltip'>
                          <Button ml="4" variant="ghost" borderColor="teal.500" borderWidth="2px" color="white" bgColor="teal" _hover={{ bgColor: "teal.400" }}>excel ?</Button>
                        </Tooltip>
                        <Tooltip
                         label={<Box><Image width="300px" h="100px" src={multisenderTxt}/><Text fontSize={21}>지갑주소 , 보내는 수량</Text></Box>} 
                         width={600}
                         placement="top"
                         aria-label='A tooltip'>
                          <Button ml="4" variant="ghost" borderColor="teal.500" borderWidth="2px" color="white" bgColor="teal" _hover={{ bgColor: "teal.400" }}>txt ?</Button>
                        </Tooltip>
                        {excelValue? 
                        <Button ml="4" w="16" onClick={() => {setIsTextareaDisable(false);setExcelValue("")}} variant="ghost" borderColor="teal.500" borderWidth="2px" color="white" bgColor="teal" _hover={{ bgColor: "teal.400" }}>수정</Button> :
                        <></>
                        }
                    </Flex>
                    
                    <Button onClick={checkFormat} borderColor="teal.500" borderWidth="2px" mt="5" bgColor="teal" _hover={{ bgColor: "teal.400" }} color="white">
                        <TbSend size="20"/>
                        <Text ml="1" _hover="teal.400">전송하기</Text>
                    </Button>
                    <Text mt="4" color="white" >
                        계정당 전송 수수료 : 0.0001 ETH
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
};

export default Multi;
