"use client";
import { Col, Flex } from "antd";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { breakPointsMd } from "@/constants/screen";
import { HomeContainer } from "./style";
import Link from "next/link";
import { ROUTES } from "@/constants/Routes";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: breakPointsMd });

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
        <Flex gap={40} wrap justify="center">
          <Link href={ROUTES.map}>
            <Flex align="center" vertical className="itemHolder">
              <Image
                src="/images/map.svg"
                alt="iranMap"
                width={40}
                height={40}
              />
              <div className="itemText">نقشه</div>
            </Flex>
          </Link>
          {!isMobile && (
            <Link href={ROUTES.dashboard.concat("?view=table")}>
              <Flex align="center" vertical className="itemHolder">
                <Image
                  src="/images/table.svg"
                  alt="iranMap"
                  width={40}
                  height={40}
                />
                <div className="itemText">جدول</div>
              </Flex>
            </Link>
          )}
          <Link href={ROUTES.dashboard}>
            <Flex align="center" vertical className="itemHolder">
              <Image
                src="/images/card.svg"
                alt="iranMap"
                width={40}
                height={40}
              />
              <div className="itemText">کارت</div>
            </Flex>
          </Link>
        </Flex>
      </Col>
    </HomeContainer>
  );
}
