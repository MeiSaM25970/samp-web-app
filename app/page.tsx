import { Col, Flex } from "antd";
import { HomeContainer } from "./styles";
import Image from "next/image";

export default function Home() {
  return (
    <HomeContainer justify={"center"}>
      <Col span={24}>
        <Image
          src="/images/iranMap.svg"
          alt="iranMap"
          width={381}
          height={350}
        />
      </Col>
      <Col span={24}>
        <p className="fontHolder">
          لطفا نوع نمایش تحلیل مد نظر خود را انتخاب کنید.
        </p>
      </Col>
      <Col span={24}>
        <Flex gap={40}>
          <Flex align="center" vertical className="itemHolder">
            <Image src="/images/map.svg" alt="iranMap" width={40} height={40} />
            <div className="itemText">نقشه</div>
          </Flex>
          <Flex align="center" vertical className="itemHolder">
            <Image
              src="/images/table.svg"
              alt="iranMap"
              width={40}
              height={40}
            />
            <div className="itemText">جدول</div>
          </Flex>
          <Flex align="center" vertical className="itemHolder">
            <Image
              src="/images/card.svg"
              alt="iranMap"
              width={40}
              height={40}
            />
            <div className="itemText">کارت</div>
          </Flex>
        </Flex>
      </Col>
    </HomeContainer>
  );
}
