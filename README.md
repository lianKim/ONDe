# tHere

tHEre 여행을 하면서 찍은 사진을 여행 별로 저장 및 공유 할 수 있는 서비스입니다.  
여행 때 다녀온 장소를 지도에 표시하여 여행 경로를 쉽게 파악 할 수 있습니다.  
사용자는 여행 장소에 대하여 글을 남길 수 있고 댓글을 이용하여 소통을 할 수 있습니다.  

![image](https://user-images.githubusercontent.com/68500898/201557974-15cb6357-0011-4c6e-88ec-69c35ff00c70.png)



## 구현 기능

<table align="center">
  <thead>
    <tr margin-bottom=3px>
      <td width="300" align="center">
        <b style="color:#8fe3d9"> 수정 테스트<b>
      </td>
      <td width="300" align="center">
        <b>
          프로필 수정
        </b>
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="300" align="center">
        <img src="https://user-images.githubusercontent.com/49369306/195571145-08304ede-6e58-4e18-8655-a788ef34eb63.gif" width="350">
      </td>
      <td width="300" align="center">
        <img src="https://user-images.githubusercontent.com/49369306/195573656-1e4f25b1-7568-428b-a08e-e761738786ea.gif" width="350">
      </td>
    </tr>
    <tr>
      <td width="300" align="center">
        <b>
          사진 입력, 조회, 삭제 기능
        </b>
      </td>
      <td width="300" align="center">
        <b>
          사진 입력 시 시간 자동 추천 기능
        </b>
      </td>
    </tr>
    <tr>
      <td width="300" align="center">
        <img src="https://user-images.githubusercontent.com/108394338/201657042-b46832a6-e379-4f1d-810e-fb279f804008.gif" width="350"  > 
      </td>
      <td width="300" align="center">
        <img src="https://user-images.githubusercontent.com/108394338/201650886-544ee779-0246-496e-a123-876269a59cbd.gif" width="350" >
      </td>
    </tr>
    <tr>
      <td width="300" align="center">
        <b>
          사진 입력 시 관련 장소 자동 추천 기능
        </b>
      </td>
      <td width="300" align="center">
        <b>
          장소 검색 기능
        </b>
      </td>
    </tr>
    <tr>
      <td width="300" align="center">
        <img src="https://user-images.githubusercontent.com/108394338/201651973-cf8561cf-1f62-4a5a-a3ea-91619d232dfa.gif" width="350"  > 
      </td>
      <td width="300" align="center">
        <img src="https://user-images.githubusercontent.com/108394338/201650886-544ee779-0246-496e-a123-876269a59cbd.gif" width="350" >
      </td>
    </tr>
  </tbody>
</table>


<br><br>

### 여정
![여정_카테고리_검색](https://user-images.githubusercontent.com/68500898/201556167-7d13f5f3-514b-4d74-94bc-900663941397.gif)
- 장소 및 카테고리를 OR 조건으로 검색할 수 있습니다.
- 각 여정에는 북마크를 하여 빠르게 조회 하실 수 있습니다.

### 장소
![장소_조회](https://user-images.githubusercontent.com/68500898/201556298-198a1b09-5710-4346-bad5-24584a11079b.gif)
- 여정에 다녀왔던 장소들을 확인 하실 수 있습니다.
- 각 장소 역시 테마를 기반으로 검색이 가능합니다.
- 장소에 대하여 좋아요 및 댓글 작성이 가능합니다.

### 소셜 로그인
![소셜로그인](https://user-images.githubusercontent.com/68500898/201556356-0eac263b-c161-4aec-9723-cf6eb1117b5d.gif)
- 구글 소셜로그인을 제공합니다.

## Architecture
![image](https://user-images.githubusercontent.com/68500898/201556520-be86f647-5a86-42d2-9994-4cccaa34e1dc.png)
- 모든 서버는 AWS에 올라가 있습니다.
- 구동중인 서버: Redis Server, ONDe Server, MySQL(AWS RDS)Server, Amazon S3(이미지 저장소)

## CI/CD Pipeline
![image](https://user-images.githubusercontent.com/68500898/201556557-b53fa936-8283-4907-b5b3-c6aa3db2563c.png)
- 기능이 추가될 때 마다 수동 배포 하는 것에 불편함을 느끼고 CI/CD 파이프라인을 구축 했습니다.
- 진입장벽이 낮고, GitHub과 통합이 쉬운 GitHub Actions를 이용 했습니다.
- GitHub master 브렌치에 push 이벤트가 발생하면 CI/CD Pipeline이 동작하도록 구성 했습니다.

## ERD
![image](https://user-images.githubusercontent.com/68500898/201557057-874d2c5f-e856-4d66-9562-cab5350ed5b6.png)


# tHere

노션 링크 : https://www.notion.so/ONDE-17658ae87a9b4ac6b8502b1dc276951d
