# Childcare Center - Hub Code

## Install
1. venv 설치
2. venv 실행
3. Package install `requirements.txt`
4. run main.py


# Anomaly List 

- 핵심 추적 이상행동 
```py
class AnomalyEnum(enum.Enum):
    # Main Target 3 
    ASSUALT = enum.auto()  # 폭행
    FIGHT = enum.auto()  # 싸움
    SWOON = enum.auto()  # 실신
```

- 이상행동 속 등장하는 추적 행위

```py
class ActionEnum(enum.Enum):
    # Maing Target 10
    NONE = enum.auto()  # 행위 감지 없음
    PUNCHING = enum.auto()  # 휘두르기
    KICKING = enum.auto()  # 차기
    PUSHING = enum.auto()  # 밀치기
    PULLING = enum.auto()  # 당기기
    THROWING = enum.auto()  # 던지기
    THREATEN = enum.auto()  # 위협하기
    PIERCING = enum.auto()  # 찌르기
    FALLDOWN = enum.auto()  # 쓰러짐
    TOTTER = enum.auto()  # 비틀거림
```