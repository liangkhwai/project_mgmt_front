import React from "react";
import univer3 from "../../assets/univer3.png";

const Contact = () => {
  return (
    <div className="bg-blue-50 flex flex-col justify-normal h-screen">
      <div className="mx-44">
        <div className="text-4xl my-10 text-blue-800 font-semibold">
          ข้อมูลผู้ติดต่อ
        </div>
        <div className="bg-white p-10 mb-20 border rounded-xl ">
          <img
            src={univer3}
            alt="dsadsa"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="ml-2">
            <div className="text-black text-3xl font-bold mt-8">
              คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ
              มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น
            </div>
            <div className="text-black mt-5 text-xl">
              สาขาระบบสารสนเทศทางคอมพิวเตอร์ อาคาร 11 ชั้น 1
            </div>
            <div className="text-black text-xl mt-1">
              150 ถ.ศรีจันทร์ ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000
            </div>
            <div className="text-black text-xl mt-1">
              เบอร์โทร: 043-283706 ภายใน 2460
            </div>
          </div>
          <div className="mt-10">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1913.4661528196496!2d102.86230943879478!3d16.42826406878465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31228bda829566e7%3A0x24ca9da06e436ef3!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li14Lij4Liy4LiK4Lih4LiH4LiE4Lil4Lit4Li14Liq4Liy4LiZIOC4p-C4tOC4l-C4ouC4suC5gOC4guC4leC4guC4reC4meC5geC4geC5iOC4mQ!5e0!3m2!1sth!2sth!4v1682871832375!5m2!1sth!2sth"
            width="1450"
            height="650"
            style={{ border: 0, margin: "auto" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
