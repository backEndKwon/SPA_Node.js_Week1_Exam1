
/* Node.js 입문주차 1차 테스트 */

//Goal : 회원목록 조회 API 만들기(express구동x,손코딩o)

/* (1) 회원 일반 조회 */
router.get("/user/", async (req, res) => {

    try {
        //Users의 모든 data가져오기
        //먼저 실행하기 위해 await
        const usersList = await Users.find({});

        //client 조회시 반환 값 설정
        const list = usersList.map((data) => {
            return {
                userId: data._id,
                name: data.name,
                ID: data.ID,
                password: data.password
            };
        });
        res.status(200).json({ message: "회원목록 조회 성공" });
        //이건 빼도 됨
    } catch (err) {
        res.status(400).json({ message: "오류 발생" });
    };
});

/* (2) 회원 상세 조회 */
router.get("/user/:_userid", async (req, res) => {

    //상세조회에서는 고유값 _userId를 사용하기 위해 params를 사용하기

    const { _userid } = req.params;
    //주소_userid와 동일한 _id를 가지는 Users의 모든데이터 가져오기
    const userDetail = await Users.find({ _id: _userid });

    try {
        if (!userDetail) {
            return res.status(400).json({ message: "회원 상세 조회 실패" });
        }
        res.status(200).json({ "result": userDetail })
    } catch (err) {
        res.status(400).json({ message: "오류 발생" });
    };
});