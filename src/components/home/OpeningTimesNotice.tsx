export default function OpeningTimesNotice() {
  const noticeText = null;

  return (
    <>
      {noticeText ? (
        <div className="pt-5 flex flex-col items-center">
          <p className="text-xl">notice</p> <p>{noticeText}</p>{" "}
        </div>
      ) : null}
    </>
  );
}
