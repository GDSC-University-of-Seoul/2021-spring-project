import enum

class AnomalyEnum(enum.Enum):
    # Main Target
    ASSUALT = enum.auto() # 폭행
    FIGHT = enum.auto() # 싸움
    SWOON = enum.auto() # 실신

    # Extra Target
    BURGLARY = enum.auto() # 절도
    VANDALISM = enum.auto() # 기물파손
    WANDER = enum.auto() # 배회
    TRESPASS = enum.auto() # 침입
    DUMP = enum.auto() # 투기
    ROBBERY = enum.auto() # 강도
    DATEFIGHT = enum.auto() # 추행
    KIDNAP = enum.auto()   # 납치
    DRUNKEN = enum.auto()  # 주취행동
