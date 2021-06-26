import enum


class ActionEnum(enum.Enum):
    # Maing Target
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

    # Extra Target
    PICKUP = enum.auto()  # 줍기
    CARRING = enum.auto()  # 나르기
    AROUND = enum.auto()  # 맴돌기
    STOPANDGO = enum.auto()  # 가다서기
    CLIMBWALL = enum.auto()  # 담넘기
    WALKING = enum.auto()  # 걷기
    DROP = enum.auto()  # 떨어뜨림
    STEAL = enum.auto()  # 훔치기
    HUGGING = enum.auto()  # 안기
    TOUCHING = enum.auto()  # 만지기
    SITDOWN = enum.auto()  # 주저앉기
